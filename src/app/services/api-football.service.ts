import {inject, Injectable} from '@angular/core'
import {environment} from '../../environments/environment'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, forkJoin, toArray, concatMap, range} from 'rxjs'
import { map, mergeMap } from 'rxjs/operators';
import {IFixtureResponse} from '../../models/IFixtureResponse'
import {ISpelerApiResponse, ISpelerData} from '../../models/ISpelerApiResponse'
import {ICurrentRoundResponse} from '../../models/ICurrentRoundResponse'
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject'

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

});

  #season = 2023
  #league = 144


  constructor() { }




  getSpelers(): Observable<ISpelerData[]> {
    return this.#http.get<ISpelerApiResponse>(`${this.#baseUrl}/v3/players?league=${this.#league}&season=${this.#season}&page=1`, { headers: this.#headers }).pipe(
      concatMap(ApiResponse => {
        const totalPages = ApiResponse.paging.total;
        return range(1, totalPages).pipe(
          concatMap(page => this.#http.get<ISpelerApiResponse>(`${this.#baseUrl}/v3/players?league=${this.#league}&season=${this.#season}&page=${page}`, { headers: this.#headers })),
          toArray()
        );
      }),
      map(ApiResponses => ApiResponses.flatMap(ApiResponse => ApiResponse.response))
    );
  }


  //speeldagen/wedstrijden
  getSpeeldag(): Observable<ICurrentRoundResponse> {
    return this.#http.get<ICurrentRoundResponse>(`${environment.apiFixtureUrl}?league=${this.#league}&season=${this.#season}`);
  }

  getWedstrijden(): Observable<IFixtureResponse> {
    const headers = new HttpHeaders({
      'X-Rapidapi-Key': this.#apiKey,
      'X-Rapidapi-Host':this.#host
    });

    const leagueId = 144;
    const seasonYear = 2023;

    return this.#http.get<IFixtureResponse>(`${environment.apiFixtureUrl}?league=${this.#league}&season=${this.#season}`, { headers });
  }

  //spelers en transfers


}
