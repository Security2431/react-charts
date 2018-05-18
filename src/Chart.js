import React, { Component } from 'react'
import {Line} from "react-chartjs-2"
import * as zoom from 'chartjs-plugin-zoom'



const chartOptions = {
/*  pan: {
    enabled: true,
    mode: 'x',
  },
  zoom: {
    enabled: true,                      
    mode: 'x',
  }*/
}

export default class Chart extends Component {
  constructor(props) {    
    super(props)

    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          },
          {
            label: 'Today',
            fill: true,
            lineTension: 0.1,
            backgroundColor: '#3f51b5',
            borderColor: '#3f51b5',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#3f51b5',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#3f51b5',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          },

        ]
      },
    }
  }

  render() {
    return (
      <div className={`chart ${this.props.className}`}>
        <a href={`https://alpari.com/ru/investor/pamm/${this.props.id}/`} target="_blank">{this.props.label}</a>
        <Line
          data={this.state.chartData}
          options={chartOptions}
          height={parseInt(this.props.height) && 100}
          width={parseInt(this.props.width) && 100}
          />
      </div>
    )
  }

  componentDidMount() {
    console.log(`https://alpari.com/ru/investor/pamm/${this.props.id}/`)
    fetch(`https://alpari.com/ru/investor/pamm/${this.props.id}/monitoring/hourly_equity_value.json?start=${this.props.start}&end=${this.props.end}`)
    .then((response) => {
      var contentType = response.headers.get("content-type")
      if(contentType && contentType.includes("application/json")) {
        return response.json()
      }
      throw new TypeError("Oops, we haven't got JSON!")
    })
    .then((json) => { 
      /* process your JSON further */
      const min = json[0][2]
      let labels
      const diffDate = new Date(this.props.end) - new Date(this.props.start)

      console.log(json)

      const data = json.map((item) => {
        return item[2] - min
      })

      if (diffDate >= 1) {
        labels = json.map((item) => {
          return item[0].slice(0, item[0].length - 5)
        })
      } else {
        labels = json.map((item) => {
          return item[0].slice(-5)
        })
      }

      const chartData = this.state.chartData
      chartData.datasets[0].data = data
      chartData.datasets[0].label = `${this.props.label} №${this.props.id}`
      chartData.labels = labels


      this.setState({
        chartData: chartData
      })
    })
    .catch((error) => { console.log(error) })
  }
}