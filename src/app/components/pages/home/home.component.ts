import { Component } from '@angular/core';
import {MomentService} from "../../../services/moment.service";
import {Moment} from "../../../interfaces/Moment";
import {environment} from "../../../../environments/environment";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FaIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  allMoments: Moment[] = []
  moments: Moment[] = []

  baseUrl: string = environment.baseUrl

  faSearch = faSearch
  searchTerm: string = ''

  constructor(private momentService: MomentService) {
  }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data: Moment[] = items.data
      data.map((moment: Moment) => moment.created_at = new Date(moment.created_at!).toLocaleDateString("pt-BR"))
      console.log(data)
      this.allMoments = data
      this.moments = data
    })
  }

  searchMoment(event: Event): void {
    const target = event.target as HTMLInputElement
    const value = target.value
    this.moments = this.allMoments.filter(moment => moment.title.toLowerCase().includes(value))
  }
}
