import { NgModule } from '@angular/core';

import { DetailsComponent } from './details/details.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModulesRoutingModule } from './modules-routing.module';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { PokedexHeaderComponent } from './pokedex/components/pokedex-header/pokedex-header.component';
import { PokedexBodyComponent } from './pokedex/components/pokedex-body/pokedex-body.component';
import { PokedexContainerComponent } from './pokedex/components/pokedex-container/pokedex-container.component';


@NgModule({
  declarations: [
    DetailsComponent,
    PokedexComponent,
    PokedexHeaderComponent,
    PokedexBodyComponent,
    PokedexContainerComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    // PaginationModule.forRoot(),
    ModulesRoutingModule
  ],
  providers:[
    PokemonService
  ]
})
export class ModulesModule { }
