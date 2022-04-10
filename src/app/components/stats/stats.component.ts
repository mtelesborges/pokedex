import { Component, Input, OnInit } from '@angular/core';
import { ProgressEnum } from 'src/app/enum/progress.enum';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  @Input() name?: string;
  @Input() value?: number;

  constructor() { }

  get type(){

    const _value: number = this.value ?? 0;

    if(_value < 33){
      return ProgressEnum.DANGER;
    }

    if(_value < 66){
      return ProgressEnum.WARNING;
    }

    return ProgressEnum.SUCCESS;
  }

}
