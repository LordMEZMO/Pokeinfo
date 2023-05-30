import React from 'react'
import { useParams } from 'react-router-dom'

function ItemsDetails() {
    let {name} = useParams()
  return (
    <div>{name}</div>
  )
}

export default ItemsDetails