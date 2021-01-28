import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { loadPokemon, loadPokemonByType } from '../GraphQL/Queries'
import { Card, Spin } from 'antd'
import { AiOutlineFire, AiOutlineBug } from 'react-icons/ai'
import { IoWaterOutline, IoLeafOutline, IoPaw } from 'react-icons/io5'
import {
  GiDeathJuice,
  GiFairyWand,
  GiElectric,
  GiSwordman,
} from 'react-icons/gi'
import { MdLandscape } from 'react-icons/md'
import { SiEclipsemosquitto } from 'react-icons/si'

const isDesktop = window.innerWidth > 1024

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const TypesIcons = {
  Grass: IoLeafOutline,
  Poison: GiDeathJuice,
  Fire: AiOutlineFire,
  Water: IoWaterOutline,
  Bug: AiOutlineBug,
  Normal: IoPaw,
  Ground: MdLandscape,
  Fighting: GiSwordman,
  Fairy: GiFairyWand,
  Electric: GiElectric,
  Psychic: SiEclipsemosquitto,
}

const PokemonTypes = ({ types }) =>
  types.map(type => {
    if (TypesIcons[type]) {
      return React.createElement(TypesIcons[type], { key: type })
    }
  })

const PokemonList = ({ query, queryByType }) => {
  const searchValue = query
  const searchByTypeValue = queryByType
  const pokemonByString = loadPokemon(searchValue)
  const [pokemons, setPokemons] = useState([])

  const searchByTypeValueCapitalized =
    searchByTypeValue.charAt().toUpperCase() + searchByTypeValue.slice(1)

  const { error, loading, data } = useQuery(pokemonByString, {
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (loading) setPokemons(null)
    if (error) setPokemons('error')
    if (data) setPokemons(data.pokemons.edges)
  }, [data])

  const pokemonsFiltered = () => {
    if (!pokemons) return []
    if (searchByTypeValue) {
      return pokemons.filter(p =>
        p.node.types.includes(searchByTypeValueCapitalized)
      )
    }
    return pokemons
  }

  if (!pokemonsFiltered().length && loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )

  return (
    <div
      className="wrapper"
      style={isDesktop ? wrapperStyle : { marginTop: '30px' }}
    >
      {pokemonsFiltered().map(({ node: { id, name, types } }) => (
        <Card
          key={id}
          hoverable={true}
          title={`#${id}`}
          style={{
            flex: '0 0 23%',
            margin: isDesktop ? '0 1% 20px' : '0 10% 20px',
            flexFlow: 'row wrap',
          }}
          bodyStyle={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '20px',
          }}
        >
          <p style={{ flex: '1' }}>{name}</p>
          <PokemonTypes types={types} />
        </Card>
      ))}
    </div>
  )
}

export default PokemonList
