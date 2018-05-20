import React, { Component } from 'react'
import {Line} from "react-chartjs-2"
//import * as zoom from 'chartjs-plugin-zoom'
import moment from 'moment'

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
            label: `${this.props.label} №${this.props.id}`,
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
      dataset: {},
      isLoading: false,
    }
  }

  render() {
    const { isLoading } = this.state.isLoading

    if (isLoading) {
      return <p>Loading ...</p>
    }

    return (
      <div className={`chart ${this.props.className}`}>
        <a href={`https://alpari.com/ru/investor/pamm/${this.props.id}/`} target="_blank">{this.props.label}</a>
        <Line
          data={this.state.chartData}
          options={chartOptions}
          height={parseInt(this.props.height, 10) && 100}
          width={parseInt(this.props.width, 10) && 100}
          />
      </div>
    )
  }

  fetchData() {
    fetch(`https://alpari.com/ru/investor/pamm/${this.props.id}/monitoring/hourly_equity_value.json?`)
    .then((response) => {
      var contentType = response.headers.get("content-type")
      if(contentType && contentType.includes("application/json")) {
        return response.json()
      }
      throw new TypeError("Oops, we haven't got JSON!")
    })
    .then((json) => { 
      /* process your JSON further */
      this.setState({
        "dataset": json,
        "isLoading": false
      })

      this.updateData()
    })
    .catch((error) => { console.log(error) })
  }

  getData(json) {
    const first =      json[0][2]

    const data = json.map((item) => {
      return item[2] - first
    })

    const labels = json.map((item) => {
      return item[0]
    })

    return {"data": data, "labels": labels}
  }

  parseData(substract = 3) {
    const dataset =  this.state.dataset
    const start =    moment(new Date()).subtract(substract, "days").format('YYYY-MM-DD')

    const values = dataset.filter((item) => {
      const date = item[0].slice(0, item[0].length - 5)
      return (date >= start) && item
    })

    const lastVal =     values[values[0].length - 1]
    const prevVal =     values[values[0].length - 2]
    const first =       values[0][2]

    const last = values.map((item) => {
      const date = item[0].slice(0, item[0].length - 5)
      const diff = (lastVal > prevVal) ? prevVal : lastVal
      return (date >= diff) ? (item[2] - first) : null
    })

    const data = values.map((item) => {
      return item[2] - first
    })

    /*const labels = values.map((item) => {
      if (diffDate) {
        return item[0].slice(0, item[0].length - 5)
      }
      return item[0].slice(-5)
    })*/
    const labels = values.map((item) => {
      return item[0]
    })

    return {"data": data, "labels": labels, "last": last}
  }

  updateData(val = 3) {
    const chartData = this.state.chartData   
    const json =      this.parseData(val)
    const data =      json.data
    const labels =    json.labels
    const last =      json.last

    chartData.datasets[0].data = data
    chartData.datasets[1].data = last
    chartData.labels = labels


    this.setState({
      chartData: chartData
    })
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchData()
/*
   this.setData()*/
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.updateData(nextProps.value)
    }
  }

/*  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState, this.props.value)
  }*/
}