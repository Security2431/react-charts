import React, {Component} from 'react'
import Chart from './Chart'
import InputRange from 'react-input-range'
import Moment from 'react-moment'
import 'moment-timezone'
import 'react-input-range/lib/css/index.css'

const ShowCurrentDate = (time = 0)=> {
  const d = new Date()
  return [
    d.getFullYear(),
    "-",
    ("0" + (d.getMonth()+1)).slice(-2),
    "-",
    ("0" + (d.getDate() - time)).slice(-2)
  ].join('')    
}

const currentDate = ShowCurrentDate()

export default class ChartList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      rangeSlider: {
        value: 0
      }
    }
  }

  getChartElements() {
    return this.props.accounts.map((chart, i) => <Chart key={i} className="col-24 col-md-6 col-lg-4" label={this.props.labels[i]} id={chart} height='100' width='100' start={ShowCurrentDate(4)} end={currentDate} /> )
  } 

  render() {
    return (
      <div className="row">
        <InputRange
          className="col-24"
          maxValue={20}
          minValue={0}
          value={this.state.rangeSlider.value}
          onChange={value => this.setState({ rangeSlider: { value: value } })} />
        {this.getChartElements()}
      </div>
    )
  }
}