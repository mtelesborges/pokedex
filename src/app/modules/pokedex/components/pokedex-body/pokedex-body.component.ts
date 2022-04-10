import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokeapi/pokemon';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-pokedex-body',
  templateUrl: './pokedex-body.component.html',
  styleUrls: ['./pokedex-body.component.scss']
})
export class PokedexBodyComponent {

  @Input() pokemons?: Pokemon[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public favoriteService: FavoriteService
  ) { }

  onNavigate(pokemon: Pokemon){
    this.router.navigate([`./${pokemon.id}`], {
      relativeTo: this.activatedRoute
    })
  }

}
