import React, { Component } from 'react'
import ChartList from './ChartList'
import RangeSlider from './RangeSlider'
import '../style.css'

class App extends Component {

  state = {
    rangeValue: 3
  }

  render() {
    console.log('---', this.state.rangeValue)
    return (
      <div className="container">
        <RangeSlider changeSelected = { val => this.changeSelected(val) } />
        <ChartList 
          accounts = { this.props.accounts } 
          rangeValue = { this.state.rangeValue }
          />
      </div>
    )
  }

  changeSelected = value => {
    this.setState({ rangeValue: value })
  }

}

export default App
