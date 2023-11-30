import {Component, Input, OnInit} from '@angular/core'
import {IWedstrijd} from '../../../models/IWedstrijd'

@Component({
  selector: 'app-wedstrijd',
  templateUrl: './wedstrijd.component.html',
  styleUrls: ['./wedstrijd.component.scss'],
})
export class WedstrijdComponent  implements OnInit {

  @Input({required: true}) wedstrijd!: IWedstrijd

  constructor() { }

  ngOnInit() {}

}
