import React, { useState } from 'react'
import Searchbar from './Components/Search'
import PokemonList from './Components/PokemonList'
import { client } from './apollo-client'
import { ApolloProvider } from '@apollo/client'
import './App.css'
import 'antd/dist/antd.css'

function App() {
  const [query, setQuery] = useState('')
  const [queryByType, setQuerybyType] = useState('')
  const onSearch = (value: string) => setQuery(value)
  const isDesktop = window.innerWidth > 1024
  const onTypeButtonClick = (value: string) => setQuerybyType(value)

  const logoWidth = {
    width: isDesktop ? '400px' : '90%',
  }
  return (
    <ApolloProvider client={client}>
      <header
        style={{
          padding: '50px 0',
          backgroundColor: '#e6f7ff',
          textAlign: 'center',
        }}
      >
        <h1 style={{ width: '0', height: '0', color: 'transparent' }}>
          POKEDEX by SIMONA TROTTI
        </h1>
        <img src={'./logo.png'} style={logoWidth} alt="logo" />
      </header>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Searchbar
          onSearch={onSearch}
          onTypeButtonClick={onTypeButtonClick}
          queryByType={queryByType}
        />
        <PokemonList query={query} queryByType={queryByType} />
      </div>
    </ApolloProvider>
  )
}

export default App
