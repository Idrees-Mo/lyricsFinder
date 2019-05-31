import React from 'react'
import Tracks from '../tracks/Tracks'
import Search from '../tracks/Search'


export default function Index() {
  return (
    <React.Fragment>
      <Search></Search>
      <Tracks></Tracks>
    </React.Fragment>
  )
}
