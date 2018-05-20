import React, { Component } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

export default class RangeSlider extends Component {
  constructor(props) {
    super(props)
 
    this.state = {
      rangeSlider: {
        value: 3
      }
    }
  }
  handleChange(value) {
    this.props.changeSelected(value)
    this.setState({ rangeSlider: { value: value } })
  }

  render() {
    return (
      <InputRange
        className={`${this.props.className}`}
        maxValue={20}
        minValue={0}
        value={this.state.rangeSlider.value}
        onChange={value => this.handleChange(value)} />
    )
  }
}