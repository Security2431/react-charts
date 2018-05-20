import React, {Component} from 'react'
import Chart from './Chart'
import RangeSlider from './RangeSlider'

export default class ChartList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 3
    }
  }

  changeSelected(val) {
    this.setState({value: val})
  }

  getChartElements() {
    return this.props.accounts.map((chart, i) => <Chart key={i} className="col-24 col-md-6 col-lg-4" label={this.props.labels[i]} id={chart} height='100' width='100' value={this.state.value} /> )
  } 

  render() {
    return (
      <div className="row">
        <RangeSlider className="col-24" changeSelected={(val)=> {this.changeSelected(val)} } />
        {this.getChartElements()}
      </div>
    )
  }
}