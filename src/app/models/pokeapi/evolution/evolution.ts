import { EvolutionDetail } from "./details"

export type Evolution = {
  evolution_details: EvolutionDetail[],
  evolves_to: Evolution[],
  is_baby: boolean,
  species: {
    name: string,
    url: string
  }
}
