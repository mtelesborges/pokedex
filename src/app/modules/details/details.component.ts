import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EvolutionChain } from 'src/app/models/pokeapi/evolution/chain';
import { PokeApiBase } from 'src/app/models/pokeapi/pokeapi';
import { Pokemon } from 'src/app/models/pokeapi/pokemon';
import { Specie } from 'src/app/models/pokeapi/specie';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  title = 'pokemon';

  pokemons!: PokeApiBase;
  private $pokemons!: Subscription;
  private pokemonsLoading: boolean = false;

  pokemon!: Pokemon;
  private $pokemon!: Subscription;
  private pokemonLoading: boolean = false;

  species!: Specie;
  private $species!: Subscription;
  private speciesLoading: boolean = false;

  evolutions: any[] = [];
  private $evolutions!: Subscription;
  private evolutionsLoading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    public favoriteService: FavoriteService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.onActivatedRoute();
  }

  onActivatedRoute(){
    this.activatedRoute
      .params
      .subscribe({
        next: (_params) => {
          this.getPokemon(`https://pokeapi.co/api/v2/pokemon/${_params.id}/`);
        }
      })
  }

  getPokemon(url: string){

    this.$pokemon?.unsubscribe();

    this.pokemonLoading = true;

    this.$pokemon = this.pokemonService
      .getPokemon(url)
      .pipe(
        finalize(() => {
          this.pokemonLoading = false;
        })
      )
      .subscribe({
        next: (response: HttpResponse<Pokemon>) => {

          if(response.status !== 200 || !response.body){
            // TODO: add message if status is different of 200
            return;
          }

          this.pokemon = response.body;

          this.getRootSpecie(this.pokemon?.species?.url);

        },
        error: (error: Error) => {
          // TODO: add message if has error
        }
      })
  }

  getUrl(pokemon: Pokemon){
    return pokemon?.sprites?.other['official-artwork']?.front_default;
  }

  getRootSpecie(url: string){

    this.$species?.unsubscribe();

    this.speciesLoading = true;

    this.$species = this.pokemonService
      .getSpecies(url)
      .pipe(
        finalize(() => {
          this.speciesLoading = false;
        })
      )
      .subscribe({
        next: (response: HttpResponse<Specie>) => {

          if(response.status !== 200 || !response.body){
            // TODO: add message if status is different of 200
            return;
          }

          this.getEvolutionChain(response.body?.evolution_chain?.url);

        },
        error: (error: Error) => {
          // TODO: add message if has error
        }
      })
  }

  getEvolutionChain(url: string){

    this.$evolutions?.unsubscribe();

    this.evolutionsLoading = true;

    this.$evolutions = this.pokemonService
      .getEvolutions(url)
      .pipe(
        finalize(() => {
          this.evolutionsLoading = false;
        })
      )
      .subscribe({
        next: (response: HttpResponse<EvolutionChain>) => {

          if(response.status !== 200 || !response.body){
            // TODO: add message if status is different of 200
            return;
          }

          const _species: any[] = [];

          _species.push(response.body.chain.species);

          let _repeat: boolean = true;

          let _current = response.body.chain.evolves_to[0];

          while (_repeat === true) {

            _species.push(_current?.species);

            if(!!_current?.evolves_to?.length === false){
              _repeat = false;
              break;
            }

            _current = _current?.evolves_to[0];

          }

          this.getEvolutions(_species);

        },
        error: (error: Error) => {
          // TODO: add message if has error
        }
      })
  }

  getEvolutions(species: any[]){

    const requests = species.map(specie => this.pokemonService.getSpecies(specie.url));

    forkJoin(requests)
      .subscribe({
        next: (responses: HttpResponse<Specie>[]) => {

          const _evolutions: any[] = [];

          responses.forEach(response => {

            if(response.status !== 200 || !response.body){
              // TODO: add message if status is different of 200
              return;
            }

            const _specie = response.body;
            const _variety = _specie.varieties.find(variety => variety.is_default);
            const _pokemon = _variety?.pokemon;

            _evolutions.push(_pokemon);

          });

          const requests = _evolutions.map(evolution => this.pokemonService.getPokemon(evolution.url));

          forkJoin(requests)
            .subscribe({
              next: (responses: HttpResponse<Pokemon>[]) => {
                this.evolutions = responses.map(response => response.body);
              }
            })

        },
        error: (error: Error) => {
          // TODO: add message if has error
        }
      })

  }

  onNavigate(pokemon: Pokemon){
    this.router.navigate([`./../${pokemon.id}`], {
      relativeTo: this.activatedRoute
    })
  }

}
