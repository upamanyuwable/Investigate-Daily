import React, { Component } from 'react'
import loading from './loading.gif'
import '../spinner.css'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-4'>
        <img src={loading} alt="loading" className='spinner'></img>
      </div>
    )
  }
}

export default Spinner