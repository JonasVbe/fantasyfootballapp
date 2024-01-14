import {inject, Injectable} from '@angular/core'
import {environment} from '../../environments/environment'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, forkJoin, toArray, concatMap, range, firstValueFrom} from 'rxjs'
import {map, mergeMap} from 'rxjs/operators'
import {IFixture, IFixtureResponse} from '../../models/IFixtureResponse'
import {ISpelerApiResponse, ISpelerData} from '../../models/ISpelerApiResponse'
import {ICurrentRoundResponse} from '../../models/ICurrentRoundResponse'
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject'
import {IWedstrijd} from '../../models/IWedstrijd'

@Injectable({
  providedIn: 'root'
})
export class ApiFootballService {

  #http = inject(HttpClient)

  readonly #baseUrl = environment.apiBaseUrl
  readonly #apiKey = environment.apiFootballKey
  readonly #host = environment.apiFootballHost
  readonly #headers = new HttpHeaders({
    'X-Rapidapi-Key': this.#apiKey,
    'X-Rapidapi-Host': this.#host

  })

  #season = 2023
  #league = 144


  constructor() {
  }


  getSpelers(): Observable<ISpelerData[]> {
    return this.#http.get<ISpelerApiResponse>(`${this.#baseUrl}/v3/players?league=${this.#league}&season=${this.#season}&page=1`, {headers: this.#headers}).pipe(
      concatMap(ApiResponse => {
        const totalPages = ApiResponse.paging.total
        return range(1, totalPages).pipe(
          concatMap(page => this.#http.get<ISpelerApiResponse>(`${this.#baseUrl}/v3/players?league=${this.#league}&season=${this.#season}&page=${page}`, {headers: this.#headers})),
          toArray()
        )
      }),
      map(ApiResponses => ApiResponses.flatMap(ApiResponse => ApiResponse.response))
    )
  }


  //speeldagen/wedstrijden
  haalHuidigeRondeOp(): Observable<string> {
    const url = `${this.#baseUrl}/v3/fixtures/rounds?league=${this.#league}&season=${this.#season}&current=true`
    return this.#http.get<ICurrentRoundResponse>(url, {headers: this.#headers}).pipe(
      map(response => response.response[0])
    )
  }

  async haalSpeeldagNummerOp(): Promise<number> {
    try {
      const speeldagString = await firstValueFrom(this.haalHuidigeRondeOp())
      return this.parseSpeeldagNummer(speeldagString)
    } catch (error) {
      console.error('Fout bij het ophalen van de speeldag', error)
      return -1
    }
  }

  private parseSpeeldagNummer(speeldagString: string): number {
    // Verwijder alle niet-numerieke tekens en zet de string om naar een getal
    const nummerString = speeldagString.replace('Regular Season - ', '')
    return parseInt(nummerString, 10)
  }

  haalWedstrijdenOp(speeldag: number): Observable<IWedstrijd[]> {
    const url = `${this.#baseUrl}/v3/fixtures?league=144&season=2023&round=Regular%20Season%20-%20${speeldag}`
    return this.#http.get<IFixtureResponse>(url, {headers: this.#headers}).pipe(
      map(response => this.mapNaarIWedstrijden(response.response))
    )
  }

  private mapNaarIWedstrijden(fixtures: IFixture[]): IWedstrijd[] {
    return fixtures.map(fixture => {
      const thuisPloeg = fixture.teams.home
      const uitPloeg = fixture.teams.away
      const goals = fixture.goals
      return {
        id: fixture.fixture.id,
        thuisploeg: thuisPloeg.name,
        thuisploegId: thuisPloeg.id,
        thuisploegLogo: thuisPloeg.logo,
        uitploeg: uitPloeg.name,
        uitploegId: uitPloeg.id,
        uitploegLogo: uitPloeg.logo,
        thuisscore: goals.home,
        uitScore: goals.away,
        finished: fixture.fixture.status.short === 'FT',
        status: fixture.fixture.status.short,
        elapsed: fixture.fixture.status.elapsed,
        datum: new Date(fixture.fixture.date).toLocaleDateString(),
        uur: new Date(fixture.fixture.date).toLocaleTimeString()
      }
    })
  }


}
