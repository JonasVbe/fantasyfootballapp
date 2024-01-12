import {Component, inject, OnInit} from '@angular/core'
import {NavController, SegmentValue} from '@ionic/angular'
import {SpelersService} from '../../services/spelers.service'
import {ActivatedRoute} from '@angular/router'
import {ISpeler} from '../../../models/ISpeler'
import {debounceTime, Subject, Subscription} from 'rxjs'

@Component({
  selector: 'app-speler-transfers',
  templateUrl: './speler-transfers.page.html',
  styleUrls: ['./speler-transfers.page.scss'],
})
export class SpelerTransfersPage implements OnInit {

  navController = inject(NavController)
  spelerService = inject(SpelersService)
  activatedRoute = inject(ActivatedRoute)

  sorteerKeuze: string = 'prijs' // Begin met sorteren op prijs
  omgekeerdeSortering: boolean = true // Begin met duurste spelers bovenaan


  id?: string = undefined
  wisselSpeler: ISpeler | undefined = undefined
  toonZoekveld: boolean = false
  positieLabel: string = 'foutje'
  zoekTerm$ = new Subject<string>()
  private subscription: Subscription = new Subscription()

  inkomendeSpelers: ISpeler[] = []
  gefilterdeSpelers: ISpeler[] = []


  constructor() {
  }

  sorteerOpPrijs(a: ISpeler, b: ISpeler) {
    return this.omgekeerdeSortering ? (b.rating ?? 4) - (a.rating ?? 4) : (a.rating ?? 4) - (b.rating ?? 4)
  }

  sorteerOpNaam(a: ISpeler, b: ISpeler) {
    return this.omgekeerdeSortering ? b.naam.localeCompare(a.naam) : a.naam.localeCompare(b.naam)
  }
  checkSorteerKeuze(keuze: string) {
    if (this.sorteerKeuze === keuze) {
      this.omgekeerdeSortering = !this.omgekeerdeSortering
      this.sorteerSpelers()
    }
  }
  onSorteerKeuzeGewijzigd(keuze: SegmentValue | undefined) {
    if (typeof keuze === 'string' && this.sorteerKeuze !== keuze) {
      this.sorteerKeuze = keuze;
      this.omgekeerdeSortering = keuze === 'prijs';
      this.sorteerSpelers();
    } else {
      console.warn('sorteerKeuzeGewijzigd: sorteerkeuze is undefined')
    }
  }

  sorteerSpelers() {
    if (this.sorteerKeuze === 'prijs') {
      this.gefilterdeSpelers.sort((a, b) => this.sorteerOpPrijs(a, b))
    } else if (this.sorteerKeuze === 'naam') {
      this.gefilterdeSpelers.sort((a, b) => this.sorteerOpNaam(a, b))
    }
  }


  ngOnInit() {
    this.setSpelerData()

    this.subscription.add(this.zoekTerm$.pipe(
      debounceTime(300)
    ).subscribe(term => {
      this.zoekSpelers(term);
    }))
  }
  filterInkomendeSpelers(): ISpeler[] {
    return this.inkomendeSpelers.filter(inkomendeSpeler =>
      !this.spelerService.spelersVoorTransfers.some(spelerVoorTransfer => spelerVoorTransfer.id === inkomendeSpeler.id));
  }


  zoekSpelers(term: string) {
    if (!term) {
      this.gefilterdeSpelers = this.inkomendeSpelers
    } else {
      this.gefilterdeSpelers = this.inkomendeSpelers.filter(speler =>
        speler.naam.toLowerCase().includes(term.toLowerCase())
      )
    }
  }

  setSpelerData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id === null) {
      return
    }

    this.id = id

    this.wisselSpeler = this.spelerService.getSpelerForTransfer(this.id)
    this.spelerService.geselecteerdeSpelerVoorTransfer = this.wisselSpeler
    this.positieLabel = this.getPositieLabel()

    this.inkomendeSpelers = this.spelerService.getInkomendeSpelersVoorPositie(this.wisselSpeler?.positie)

    this.gefilterdeSpelers = this.filterInkomendeSpelers()
    this.sorteerSpelers()


  }

  getPositieLabel(): string {

    switch (this.wisselSpeler?.positie) {
      case 'Doelman':
        return 'Doelmannen'
      case 'Verdediger':
        return 'Verdedigers'
      case 'Middenvelder':
        return 'Middenvelders'
      case 'Aanvaller':
        return 'Aanvallers'
      default:
        return 'Foutje'
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
