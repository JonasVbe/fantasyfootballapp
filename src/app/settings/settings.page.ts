import {Component, inject, OnInit} from '@angular/core'
import {AuthService} from '../services/auth.service'
import {GebruikerService} from '../services/gebruiker.service'
import {IGebruiker} from '../../models/IGebruiker'
import {Subscription} from 'rxjs'



@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  #authService = inject(AuthService)
  #gebruikerService = inject(GebruikerService)
  #gebruikerSub: Subscription | null = null
  gebruiker: IGebruiker | null = null



  constructor() { }

  ionViewWillEnter() {
    console.log('ionViewWillEnter')
    this.#gebruikerSub = this.#gebruikerService.gebruiker.subscribe(
      (gebruikerData: IGebruiker | null) => {
        this.gebruiker = gebruikerData;
        // Voer acties uit met de gebruikersgegevens
      }
    );
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave')
    if (this.#gebruikerSub) {
      this.#gebruikerSub.unsubscribe();
    }
  }


  async signOut(): Promise<void> {
    await this.#authService.signOut()
  }


}
