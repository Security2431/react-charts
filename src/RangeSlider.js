import React, { Component } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

export default class RangeSlider extends Component {
  state = {
    rangeSlider: {
      value: 3
    }
  }

  handleChange(value) {
    this.props.changeSelected(value)
    this.setState({
      rangeSlider: { 
        value: value 
      }
    })
  }

  render() {
    const {className} = this.props
    const {rangeSlider} = this.state

    return (
      <InputRange
        className={className}
        maxValue={20}
        minValue={0}
        value={rangeSlider.value}
        onChange={value => this.handleChange(value)} />
    )
  }
}