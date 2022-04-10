import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() name?: string;
  @Input() id?: number;
  @Input() url?: string;
  @Input() weight?: number;
  @Input() height?: number;
  @Input() selected?: boolean;
  @Input() isFavorite?: boolean;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter();
  @Output() favoritEvent: EventEmitter<void> = new EventEmitter();

  loading: boolean = true;

  constructor(private favoriteService: FavoriteService) { }

  onClikEvent(){
    this.clickEvent.emit();
  }

  onFavoriteEvent(){
    this.favoritEvent.emit();
  }

}
