import {Component} from '@angular/core';
import {MomentService} from "../../../services/moment.service";
import {Moment} from "../../../interfaces/Moment";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {faTimes, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MessagesService} from "../../../services/messages.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-moment',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent,
    RouterLink,
    NgForOf,
    FormsModule
  ],
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moment
  momentId!: number
  baseUrl: string = environment.baseUrl

  faTimes = faTimes
  faEdit = faEdit

  constructor(private momentService: MomentService, private route: ActivatedRoute, private messagesService: MessagesService, private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id).subscribe((res) => {
      this.moment = res.data
    })
  }

  async removeHandler(id: number) {
    await this.momentService.removeMomentById(id).subscribe()
    this.messagesService.add("Registro excluído com sucesso")
    this.router.navigate(['/'])
  }

}
