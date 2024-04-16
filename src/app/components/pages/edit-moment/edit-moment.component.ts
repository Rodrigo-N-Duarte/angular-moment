import { Component } from '@angular/core';
import {Moment} from "../../../interfaces/Moment";
import {MomentService} from "../../../services/moment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MomentFormComponent} from "../../moment-form/moment-form.component";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-edit-moment',
  standalone: true,
  imports: [
    NgIf,
    MomentFormComponent
  ],
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent {
  moment!: Moment
  btnText: string = "Editar"

  constructor(private momentService: MomentService, private router: Router, private route: ActivatedRoute, private messageService: MessagesService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.momentService.getMomentById(id).subscribe((res) => {
      this.moment = res.data
    })
  }

  async editHandler(moment: Moment) {
    const id = Number(moment.id)
    const formData = new FormData()
    formData.append("title", moment.title)
    formData.append("description", moment.description)
    if (moment.image) {
      formData.append("image", moment.image)
    }
    await this.momentService.updateMomentById(id,formData).subscribe()
    this.messageService.add("Momento atualizado com sucesso.")
    this.router.navigate(['/'])
  }
}
