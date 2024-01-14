import {inject, Injectable} from '@angular/core'
import {AuthService} from './auth.service'
/*import { AngularFirestore } from '@angular/fire/compat/firestore'*/
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc, docData,
  DocumentReference,
  Firestore, getDoc,
  orderBy,
  query, setDoc, updateDoc,
  where,
} from '@angular/fire/firestore'
import {ISpeler} from '../../models/ISpeler'
import {Observable} from 'rxjs'
import firebase from 'firebase/compat'
import DocumentData = firebase.firestore.DocumentData
import {IGebruiker} from '../../models/IGebruiker'
import {GebruikerService} from './gebruiker.service'
import {IPloeg} from '../../models/IPloeg'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  #firestore = inject(Firestore)
  #gebruikerService = inject(GebruikerService)

/*  #angularFirestore = inject(AngularFirestore)*/

  constructor() {

  }

  async updateGebruiker(gebruiker: IGebruiker) {
    const huidigeGebruiker = this.#gebruikerService.getHuidigeGebruiker()
    if(!huidigeGebruiker){
      console.log('gebruiken niet gevonden voor update')
      throw new Error('Gebruiker niet gevonden voor update')
    }

    // Controleer op verschillen tussen de huidige en nieuwe gebruiker
    if (this.#isGebruikerGewijzigd(huidigeGebruiker, gebruiker)) {
      console.log('gebruiker gewijzigd')
      const gebruikerRef = doc(this.#firestore, 'gebruikers', gebruiker.id)
      await setDoc(gebruikerRef, gebruiker)
      console.log("docset")

      // Update de lokale staat
      this.#gebruikerService.setGebruiker(gebruiker)
    }
  }

  async haalGebruikerOp(userId: string): Promise<void> {
    const docRef = doc(this.#firestore, 'gebruikers', userId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      throw new Error('Gebruiker niet gevonden')
    }

    this.#gebruikerService.setGebruiker(docSnap.data() as IGebruiker)

  }

  async updateGebruikerZonderControle(gebruiker: IGebruiker) {
    const gebruikerRef = doc(this.#firestore, 'gebruikers', gebruiker.id)
    await setDoc(gebruikerRef, gebruiker)
    console.log('geupdate volgens update gebruikerzondercontrole')
  }

  async haalOpOfMaakGebruiker(firebaseUser: any): Promise<void> {
    const gebruikerRef = doc(this.#firestore, 'gebruikers', firebaseUser.uid)
    const docSnap = await getDoc(gebruikerRef)

    if (docSnap.exists()) {
      // Gebruiker bestaat al, haal de gegevens op
      this.#gebruikerService.setGebruiker(docSnap.data() as IGebruiker)
    } else {
      //maak een nieuwe ploeg aan
      const nieuwePloeg: IPloeg = {
        naam: 'Stel een ploegnaam in',
        teamSelecties: []
      }

      // Maak een nieuwe gebruiker aan
      const nieuweGebruiker: IGebruiker = {
        id: firebaseUser.uid,
        naam: firebaseUser.displayName || 'Anonieme Gebruiker',
        ploeg: nieuwePloeg
      };

      // Sla de nieuwe gebruiker op in Firestore
      await setDoc(gebruikerRef, nieuweGebruiker)
      this.#gebruikerService.setGebruiker(nieuweGebruiker)
    }
  }

  #isGebruikerGewijzigd(huidigeGebruiker: IGebruiker, nieuweGebruiker: IGebruiker): boolean {

    if (huidigeGebruiker.naam !== nieuweGebruiker.naam) {
      return true
    }

    if (huidigeGebruiker.ploeg && nieuweGebruiker.ploeg &&
      huidigeGebruiker.ploeg.naam !== nieuweGebruiker.ploeg.naam) {
      return true
    }
    if (huidigeGebruiker.ploeg.teamSelecties[huidigeGebruiker.ploeg.teamSelecties.length - 1]
      !== nieuweGebruiker.ploeg.teamSelecties[huidigeGebruiker.ploeg.teamSelecties.length - 1]){
      return true
    }

    return huidigeGebruiker.ploeg.teamSelecties.length !== nieuweGebruiker.ploeg.teamSelecties.length

  }


}
