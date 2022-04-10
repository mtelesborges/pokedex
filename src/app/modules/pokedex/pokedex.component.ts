import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { PokeApiBase } from 'src/app/models/pokeapi/pokeapi';
import { Pokemon } from 'src/app/models/pokeapi/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  title = 'pokemon';

  pokeapi?: PokeApiBase;

  private $urls!: Subscription;

  pokemons?: Pokemon[];
  private $pokemons!: Subscription;
  pokemonsLoading: boolean = true;

  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 20;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.onActivatedRoute();
  }

  onActivatedRoute(){
    this.activatedRoute
      .queryParams
      .subscribe({
        next: (params) => {

          const _id = params?.id;

          if(_id){
            this.getPokemon(_id);
            return;
          }

          let _page = +params?.page ?? 0;

          if(_page > 0){
            --_page;
          }

          const _offset = (this.itemsPerPage * _page);

          const _limit = this.itemsPerPage ?? 20;

          const _params = {
            offset: _offset,
            limit: _limit
          }

          this.getPokemons(_params);
        }
      })
  }

  getPokemons(params?: any){

    this.$urls?.unsubscribe();

    this.pokemonsLoading = true;

    this.$urls = this.pokemonService
      .getPokemons(params)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.pokemonsLoading = false;
          }, 1000);
        })
      )
      .subscribe({
        next: (response: HttpResponse<PokeApiBase>) => {

          if(response.status !== 200 || !response.body){
            // TODO: add message if status is different of 200
            return;
          }

          const requests = response
            .body
            .results
            .map(result => this.pokemonService.getPokemon(result.url));

          this.totalItems = response.body.count;

          this.$pokemons?.unsubscribe();

          this.$pokemons = forkJoin(requests)
            .subscribe({
              next: (responses: HttpResponse<Pokemon>[]) => {
                this.pokemons = responses.map(response => response.body) as Pokemon[];
              }
            });

        },
        error: (error: any) => {
          // TODO: add message if has error
          this.pokemons = [];
        }
      })
  }

  getPokemon(id: number){

    this.$pokemons?.unsubscribe();

    const _url = `https://pokeapi.co/api/v2/pokemon/${id}/`

    this.pokemonsLoading = true;

    this.$pokemons = this.pokemonService
      .getPokemon(_url)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.pokemonsLoading = false;
          }, 1000);
        })
      )
      .subscribe({
        next: (response: HttpResponse<Pokemon>) => {

          if(response.status !== 200 || !response.body){
            // TODO: add message if status is different of 200
            return;
          }

          this.pokemons = [response.body];

        },
        error: (error: any) => {
          // TODO: add message if has error
          this.pokemons = [];
        }
      })
  }

}
