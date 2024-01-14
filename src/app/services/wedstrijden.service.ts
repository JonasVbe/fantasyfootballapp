import {inject, Injectable} from '@angular/core'
import {firstValueFrom} from 'rxjs'
import {ApiFootballService} from './api-football.service'

@Injectable({
  providedIn: 'root'
})
export class WedstrijdenService {
  #apiService = inject(ApiFootballService)

  speeldagen: string[] = []
  huidigeSpeeldag: number = 0

  constructor() {
    for(let i = 1; i < 31; i++){
      this.speeldagen.push(`Speeldag ${i}`)
    }
  }

}
