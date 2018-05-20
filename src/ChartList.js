import React, {Component} from 'react'
import Chart from './Chart'
import RangeSlider from './RangeSlider'

export default class ChartList extends Component {
  constructor(props) {
    super(props)
  }

  getChartElements() {
    return this.props.accounts.map((chart, i) => <Chart key={i} className="col-24 col-md-6 col-lg-4" label={this.props.labels[i]} id={chart} height='100' width='100' /> )
  } 

  render() {
    return (
      <div className="row">
        <RangeSlider className="col-24"/>
        {this.getChartElements()}
      </div>
    )
  }
}