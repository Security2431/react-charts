import React, { Component } from 'react'
import ChartList from './ChartList'
import './style.css';

const accounts = ['374756', '408559', '376862', '219161', '381174', '198572', '381546', '386780', '329842']
const labels =   ['ST PRIORITY', 'Constellation', 'Night Owl Turbo', 'Hercules', 'SunTime', 'Expensivebuyer', 'Rumpelstilzchen Rage', 'RoboCop 2020 x 2', 'Moriarti']

class App extends Component {
  render() {
    return (
      <div className="container">
        <ChartList accounts={accounts} labels={labels}></ChartList>
      </div>
    )
  }
}

export default App
