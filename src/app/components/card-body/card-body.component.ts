import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-body',
  templateUrl: './card-body.component.html',
  styleUrls: ['./card-body.component.scss']
})
export class CardBodyComponent {

  @Input() url?: string;
  loading: boolean = true;

  constructor() { }

}
