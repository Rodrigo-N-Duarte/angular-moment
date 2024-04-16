import { Component } from '@angular/core';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {MessagesService} from "../../services/messages.service";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  protected readonly faTimes = faTimes;

  constructor(public messageService: MessagesService) {
  }
}
