export type Specie = {
  id: number,
  name: string,
  evolution_chain: {
    url: string
  },
  varieties: {
    is_default: true,
    pokemon: {
      name: string,
      url: string
    }
  }[]
}
