import {Component, inject, OnInit} from '@angular/core'
import {GebruikerService} from '../services/gebruiker.service'
import {FirestoreService} from '../services/firestore.service'
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  #firestoreService = inject(FirestoreService)
  #authService = inject(AuthService)
  #gebruikerService = inject(GebruikerService)


  constructor() {
  }

  async ngOnInit() {
    const uid = this.#authService.getUserUID()
    let gebruiker = this.#gebruikerService.gebruiker
    console.log('ngOnInit tabs')
    console.log(gebruiker)
    console.log(uid)
    if(uid !== undefined && gebruiker !== null){

      await this.#firestoreService.haalGebruikerOp(uid)

    }




    }
 /* }*/
}
