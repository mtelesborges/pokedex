import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-icon',
  templateUrl: './card-icon.component.html',
  styleUrls: ['./card-icon.component.scss']
})
export class CardIconComponent {

  @Input() value?: number;
  @Input() title?: string;
  @Input() icon?: string;

  constructor() { }
}
