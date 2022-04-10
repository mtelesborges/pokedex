import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';

import { PokeApiBase } from '../models/pokeapi/pokeapi';
import { Pokemon } from '../models/pokeapi/pokemon';
import { Specie } from '../models/pokeapi/specie';
import { EvolutionChain } from '../models/pokeapi/evolution/chain';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(
    private _httpClient: HttpClient
  ) { }

  getPokemon(url: string){
    return this._httpClient.get<Pokemon>(`${url}`, {
      observe: 'response'
    })
  }

  getPokemons(params?: any){
    return this._httpClient.get<PokeApiBase>(`${this.baseUrl}/api/v2/pokemon`, {
      observe: 'response',
      params: params
    })
  }

  getSpecies(url: string){
    return this._httpClient.get<Specie>(`${url}`, {
      observe: 'response'
    })
  }

  getEvolutions(url: string){
    return this._httpClient.get<EvolutionChain>(`${url}`, {
      observe: 'response'
    })
  }

}
