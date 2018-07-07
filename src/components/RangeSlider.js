import React, { Component } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

export default class RangeSlider extends Component {
  state = {
    value: 3,
  }

  render() {
    return (
      <InputRange
        maxValue = { 20 }
        minValue = { 1 }
        value = { this.state.value }
        onChange = { value => this.handleChange( value ) }
        />
    )
  }

  handleChange = value => {
    this.props.changeSelected(value)

    this.setState({
      value: value
    })
  }
}