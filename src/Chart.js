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
      public_json: {},
      isLoading: false,
      todayOnly: [],
    }
  }

  todayRate() {
    const data = this.state.todayOnly
    let { 0 : firstDataToday ,[data.length - 1] : lastDataToday } = data

    const diffDataToday = Math.round( (lastDataToday - firstDataToday) * 100 ) / 100
    return diffDataToday
  }

  render() {
    const { isLoading } = this.state

    const todayRateValue = this.todayRate().toString()
    const rateColor = (todayRateValue > 0) ? "green" : (todayRateValue < 0) ? "red" : "grey"

    return (
      <div className={`chart ${this.props.className}`}>
        <div className="row justify-content-between">
          <div className="col-auto">
            <a href={`https://alpari.com/ru/investor/pamm/${this.props.id}/`} target="_blank">{this.props.label}</a>
          </div>
          <div className="col-auto">
            {
              !isLoading ? (
                <small className="rate" style={{ color: rateColor }}>
                  {todayRateValue > 0 ? <span className="rate__icon">&#9652;</span> : (todayRateValue < 0) && <span className="rate__icon">&#9662;</span> }&nbsp;
                  { this.todayRate().toString() + "%" }
                </small>
              ) : (
                <img src="/loading.gif" alt="Loading..." width="40" height="40" />
              )
            }
          </div>
        </div>
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
    const proxyUrl =  'https://cors-anywhere.herokuapp.com/'
    const targetUrl = `https://alpari.com/ru/investor/pamm/${this.props.id}/monitoring/hourly_equity_value.json?`
    const query =     proxyUrl + targetUrl
    const options = {
      method: 'GET',
      mode: 'cors',
    }
    
    fetch(query, options)
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
        "public_json": json,
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

  updateData(val = 3) {
    const {chartData} = this.state
    const {data, labels, today, todayOnly} = this.parseData(val)

    chartData.datasets[0].data = data
    chartData.datasets[1].data = today
    chartData.labels = labels


    this.setState({
      chartData: chartData,
      todayOnly: todayOnly
    })
  }

  rate(first, last) {
    const rateFirst = parseInt(first, 10) + 100
    const rateLast = parseInt(last, 10) + 100
    return Math.round(( (rateLast - rateFirst) / rateFirst * 100) * 100 ) / 100
  }

  parseData(substract = 3) {
    const {public_json} =      this.state
    const today =        moment(new Date()).format('YYYY-MM-DD') + " 00:00"
    const startDate =    moment(new Date()).subtract(substract, "days").format('YYYY-MM-DD') // By default, start day is -3 days from now

    const values = public_json.filter((item) => { // Filter all objects, which is behind startDate
      //const currDate = item[0].slice(0, item[0].length - 5) // Slice hours and minutes from date
      const currDate = item[0]
      return (currDate >= startDate) && item
    })

    const first =       values[0][2]
    let todayOnly = []

    const todayData = values.map((item) => {
      if (item[0] >= today) {
        todayOnly.push( this.rate(first, item[2]) )
        return this.rate(first, item[2])
      }

      return null
    })

    const allData = values.map((item) => this.rate(first, item[2]))

    const labels = values.map((item) => item[0])  // Filter labels, which is behind startDate

    return {"data": allData, "labels": labels, "today": todayData, "todayOnly":  todayOnly}
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.fetchData()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.updateData(nextProps.value)
    }
  }

/*  
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState, this.props.value)
  }
*/
}