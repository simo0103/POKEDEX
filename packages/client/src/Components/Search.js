import React from 'react'
import { Input, Button } from 'antd'
import { AiOutlineSearch, AiOutlineFire, AiOutlineBug } from 'react-icons/ai'
import { IoWaterOutline, IoLeafOutline, IoPaw, IoClose } from 'react-icons/io5'
import {
  GiDeathJuice,
  GiFairyWand,
  GiElectric,
  GiSwordman,
} from 'react-icons/gi'
import { MdLandscape } from 'react-icons/md'
import { SiEclipsemosquitto } from 'react-icons/si'
import 'antd/dist/antd.css'
import { Option } from 'antd/lib/mentions'

const { Search } = Input
const suffix = (
  <AiOutlineSearch
    style={{
      fontSize: 14,
      color: '#1890ff',
    }}
  />
)
const POKEMON_TYPES = {
  grass: {
    value: 'grass',
    icon: IoLeafOutline,
  },
  water: {
    value: 'water',
    icon: IoWaterOutline,
  },
  fire: {
    value: 'fire',
    icon: AiOutlineFire,
  },
  electric: {
    value: 'electric',
    icon: GiElectric,
  },
  poison: {
    value: 'poison',
    icon: GiDeathJuice,
  },
  bug: {
    value: 'bug',
    icon: AiOutlineBug,
  },
  normal: {
    value: 'normal',
    icon: IoPaw,
  },
  ground: {
    value: 'ground',
    icon: MdLandscape,
  },
  fighting: {
    value: 'fighting',
    icon: GiSwordman,
  },
  fairy: {
    value: 'fairy',
    icon: GiFairyWand,
  },
  psychic: {
    value: 'psychic',
    icon: SiEclipsemosquitto,
  },
}
const styleMobile = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const Searchbar = ({ onTypeButtonClick, queryByType, onSearch }) => {
  const isDesktop = window.innerWidth > 1024
  let clicked = queryByType
  return (
    <div style={!isDesktop ? styleMobile : { margin: '30px 0' }}>
      <Search
        placeholder="search pokemon"
        onSearch={onSearch}
        style={{ width: isDesktop ? '100%' : '80%', marginBottom: '30px' }}
      />
      <div
        className="searchandfilter"
        // style={{
        //   display: 'flex',
        //   flexDirection: isDesktop ? 'row' : 'column',
        //   alignItems: 'center',
        //   textAlign: 'center',
        //   padding: isDesktop ? '20px 7%' : '10px',
        // }}
      >
        <div
          className="filterWrapper"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: isDesktop ? '' : '10px 0 30px',
          }}
        >
          {Object.keys(POKEMON_TYPES).map((type, index) => (
            <div
              key={index}
              className="buttonType"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                key={index}
                size="large"
                value={POKEMON_TYPES[type].value}
                onClick={e => {
                  if (clicked == POKEMON_TYPES[type].value) {
                    onTypeButtonClick('')
                  } else {
                    onTypeButtonClick(POKEMON_TYPES[type].value)
                  }
                }}
                style={{
                  margin: isDesktop ? '0 20px' : '20px',
                  color:
                    queryByType === POKEMON_TYPES[type].value
                      ? 'dodgerblue'
                      : 'initial',
                }}
                shape="circle"
                icon={React.createElement(POKEMON_TYPES[type].icon, {
                  style: { fontSize: '18px' },
                })}
              ></Button>
              <span style={{ textTransform: 'uppercase' }}>
                {POKEMON_TYPES[type].value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Searchbar
