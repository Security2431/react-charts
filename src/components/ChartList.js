import React, {Component} from 'react'
import Chart from './Chart'

export default class ChartList extends Component {
  state = {
    json : {}
  }

  getChartElements() {
    return this.props.accounts.map((chart, i) => <Chart key={i} className="col-24 col-md-6 col-lg-4" label={this.props.labels[i]} id={chart} height='100' width='100' value={this.state.value} /> )
  } 

  render() {
    return (
      <div className="row">
        {/*this.getChartElements()*/}
      </div>
    )
  }

  fetchData() {
    const proxyUrl =  'https://cors-anywhere.herokuapp.com/'
    const targetUrl = `https://alpari.com/ru/investor/pamm/public.json`
    const query =     proxyUrl + targetUrl
    const accounts =  this.props.accounts.map(a => a.id);
    const options = {
      method: 'GET',
      mode: 'cors',
    }
    
    fetch(query, options)
    .then((response) => {
      const contentType = response.headers.get("content-type")
      if(contentType && contentType.includes("application/json")) {
        return response.json()
      }
      throw new TypeError("Oops, we haven't got JSON!")
    })
    .then(( {elements} ) => { 
      /* process your JSON further */

      const filtered = elements.filter((el) => {
        return accounts.includes(el[0])
      })

      this.setState({
        "json": filtered,
      })
    })
    .catch((error) => { console.log(error) })
  }

  componentWillMount() {
    this.fetchData()
  }
}