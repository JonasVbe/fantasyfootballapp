import {Component, Input, OnInit} from '@angular/core'
import {IWedstrijd} from '../../../models/IWedstrijd'

@Component({
  selector: 'app-wedstrijd',
  templateUrl: './wedstrijd.component.html',
  styleUrls: ['./wedstrijd.component.scss'],
})
export class WedstrijdComponent {

  @Input({required: true}) wedstrijd!: IWedstrijd

  constructor() {
  }

  formatTijd(tijd: string | undefined): string | undefined{
    if (!tijd) return undefined

    return tijd.substring(0, 5)
  }
}


