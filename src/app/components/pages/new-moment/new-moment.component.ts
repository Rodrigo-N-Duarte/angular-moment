import { Component } from '@angular/core';
import {MomentFormComponent} from "../../moment-form/moment-form.component";
import {Moment} from "../../../interfaces/Moment";
import {MomentService} from "../../../services/moment.service";
import {MessagesService} from "../../../services/messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-moment',
  standalone: true,
  imports: [
    MomentFormComponent
  ],
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})
export class NewMomentComponent {
  constructor(private momentService: MomentService, private messageService: MessagesService, private router: Router) {
  }

  btnText: string = "Compartilhar"

  async createHandler(moment: Moment) {
    const formData = new FormData()
    formData.append("title", moment.title)
    formData.append("description", moment.description)
    if (moment.image) {
      formData.append("image", moment.image)
    }
    await this.momentService.createMoment(formData).subscribe()
    this.messageService.add("Momento criado com sucesso")
    await this.router.navigate(["/"])
  }
}
