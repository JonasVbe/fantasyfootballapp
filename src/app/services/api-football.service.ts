import {inject, Injectable} from '@angular/core'
import {environment} from '../../environments/environment'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {IFixtureResponse} from '../../models/IFixtureResponse'

@Injectable({
  providedIn: 'root'
})
export class ApiFootballService {

  readonly #apiKey = environment.apiFootballKey
  readonly #host = environment.apiFootballHost
  #http = inject(HttpClient)
  #season = 2023
  #league = 144

  constructor() { }

  getWedstrijden(): Observable<IFixtureResponse> {
    const headers = new HttpHeaders({
      'X-Rapidapi-Key': this.#apiKey,
      'X-Rapidapi-Host':this.#host
    });

    const leagueId = 144;
    const seasonYear = 2023;

    return this.#http.get<IFixtureResponse>(`${environment.apiFixtureUrl}?league=${this.#league}&season=${this.#season}`, { headers });
  }
}
