import {Component, inject, OnInit} from '@angular/core'
import {IWedstrijd} from '../../models/IWedstrijd'
import {ISpeler} from '../../models/ISpeler'

import {SpelersService} from '../services/spelers.service'

@Component({
    selector: 'app-ploeg',
    templateUrl: './ploeg.page.html',
    styleUrls: ['./ploeg.page.scss'],
})
export class PloegPage /*implements OnInit */{
    activeTab = 'mijnploeg'


    spelerService = inject(SpelersService)

    constructor() {}







  /*  ngOnInit() {
    }*/

}
