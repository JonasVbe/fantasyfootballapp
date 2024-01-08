import { Component, inject, OnInit } from '@angular/core';
import {Capacitor} from '@capacitor/core'
import {AuthService} from '../services/auth.service'
import {ModalController} from '@ionic/angular'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isNative = Capacitor.isNativePlatform()

  authService = inject(AuthService)
  /*#modalController = inject(ModalController)*/ //wanneer ik mail wil implementeren

  constructor() { }

  ngOnInit() {
  }

}
