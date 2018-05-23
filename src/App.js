import React, { Component } from 'react'
import ChartList from './ChartList'
import './style.css';

const accounts = ['374756', '408559', '376862', '219161', '381174', '198572', '381546', '386780', '329842', '360381', '369586', '385128']
const labels =   ['ST PRIORITY', 'Constellation', 'Night Owl Turbo', 'Hercules', 'SunTime', 'Expensivebuyer', 'Rumpelstilzchen Rage', 'RoboCop 2020 x 2', 'Moriarti', 'Miracletrading new', 'Sunnich M v2', 'Method_from_Bakir' ]

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
