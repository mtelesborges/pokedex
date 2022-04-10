export type PokeApiBase = {
  count: number,
  next: string,
  previous: string,
  results: {
    name: string,
    url: string
  }[]
}
