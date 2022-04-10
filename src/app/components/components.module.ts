import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { StatsComponent } from './stats/stats.component';
import { CardComponent } from './card/card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { EmptyComponent } from './empty/empty.component';
import { CardTitleComponent } from './card-title/card-title.component';
import { CardIconComponent } from './card-icon/card-icon.component';
import { CardBodyComponent } from './card-body/card-body.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    StatsComponent,
    CardComponent,
    SpinnerComponent,
    EmptyComponent,
    CardTitleComponent,
    CardIconComponent,
    CardBodyComponent,
    CardContainerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports:[
    StatsComponent,
    CardComponent,
    SpinnerComponent,
    EmptyComponent,
    PaginationComponent
  ]
})
export class ComponentsModule { }
