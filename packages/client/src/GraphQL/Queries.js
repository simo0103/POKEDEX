import { gql } from '@apollo/client'

export const loadPokemon = searchValue =>
  gql`
    query 
      {
        pokemons (q: "${searchValue}") {
          edges {
            cursor,
            node {
              id,
              name,
              types
            }
          }
        }
      }
    `
export const loadPokemonByType = searchByTypeValue => gql`
  query {
    pokemonsByType(q: "${searchByTypeValue}") {
      edges {
        cursor
        node {
          id,
          name,
          types
        }
      }
    }
  }
`
