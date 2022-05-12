import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent{

  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 20;
  @Input() totalItems: number = 0;
  @Input() maxSize?: number = 5;
  @Output() pageChanged: EventEmitter<PageChangedEvent> = new EventEmitter();

  constructor() { }

  onPageChanged(ev: PageChangedEvent){
    // const event = (ev as unknown) as PageChangedEvent;
    this.pageChanged.emit(ev);
    this.currentPage = ev.page;
  }
}
