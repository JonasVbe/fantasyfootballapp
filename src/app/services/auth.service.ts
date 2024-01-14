import {inject, Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject'
import {User, signInWithCredential, signOut, updateProfile, Auth, GoogleAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import {Router} from '@angular/router'
import {FirebaseAuthentication} from '@capacitor-firebase/authentication'
import {Capacitor} from '@capacitor/core'
import {FirestoreService} from './firestore.service'
import {IGebruiker} from '../../models/IGebruiker'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #currentUser: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null)
  currentUser = this.#currentUser.asObservable()
  gebruiker: IGebruiker | null = null

  #verificationId?: string

  #auth = inject(Auth)
  #router = inject(Router)
  #firestoreService = inject(FirestoreService)



  constructor() {
    this.#auth.onAuthStateChanged(user => this.#setCurrentUser(user))
  }
  async signInWithGoogle(): Promise<void> {
    // Sign in on the native layer.
    const authResult = await FirebaseAuthentication.signInWithGoogle()
    const idToken = authResult?.credential?.idToken

    if (!idToken) {
      throw new Error('Authentication did not succeed, please try again.')
    }
    // Sign in on the web layer.
    if (Capacitor.isNativePlatform()) {
      const credential = GoogleAuthProvider.credential(idToken)
      await signInWithCredential(this.#auth, credential)
    }
    /*console.log(this.#currentUser.value)*/
    const firebaseUser = this.#currentUser.value

     await this.#firestoreService.haalOpOfMaakGebruiker(firebaseUser)
  }
  async signInWithFacebook(): Promise<void> {
    // Sign in on the native layer.
    const authResult = await FirebaseAuthentication.signInWithFacebook();
    const idToken = authResult?.credential?.idToken;

    if (!idToken) {
      throw new Error('Authentication did not succeed, please try again.');
    }

    // Sign in on the web layer.
    if (Capacitor.isNativePlatform()) {
      const credential = FacebookAuthProvider.credential(idToken);
      await signInWithCredential(this.#auth, credential);
    }

    const firebaseUser = this.#currentUser.value;
    await this.#firestoreService.haalOpOfMaakGebruiker(firebaseUser);
  }

  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut()

    if (Capacitor.isNativePlatform()) {
      await signOut(this.#auth)
    }
  }

  getCurrentUser(): User | null {
    return this.#currentUser.value
  }
  getUserUID(): string | undefined {
    return this.#currentUser.value?.uid
  }

  async updateDisplayName(displayName: string): Promise<void> {
    if (!this.#currentUser.value) {
      throw new Error('Not authenticated')
    }

    await updateProfile(this.#currentUser.value, {
      displayName,
    })
  }

  isLoggedIn(): boolean {
    return !!this.#currentUser.value
  }

  getDisplayName(): string | undefined {
    return this.#currentUser.value?.displayName ?? undefined
  }

  async #setCurrentUser(user: User | null): Promise<void> {
    this.#currentUser.next(user)
    if (this.#currentUser.value) {
      await this.#router.navigate(['/'])
    } else {
      await this.#router.navigate(['/login'])
    }
  }
}
