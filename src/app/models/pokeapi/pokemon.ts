export type Pokemon = {
  id: number,
  height: number,
  weight: number,
  name: string,
  species: {
    name: string,
    url: string
  },
  sprites: {
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  },
  stats: {
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string
    }
  }[],
  isFavorite: boolean
}
