import {inject, Injectable} from '@angular/core'
import {IGebruiker} from '../../models/IGebruiker'
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject'


@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  #gebruikerSubject = new BehaviorSubject<IGebruiker | null>(null);
  gebruiker = this.#gebruikerSubject.asObservable()


  constructor() { }

   setGebruiker(gebruiker: IGebruiker) {
     this.#gebruikerSubject.next(gebruiker)

  }

  getHuidigeGebruiker(): IGebruiker | null {
    return this.#gebruikerSubject.value;
  }






}
