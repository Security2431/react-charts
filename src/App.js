import React, { Component } from 'react'
import ChartList from './ChartList'
import './style.css';


const accounts = ['374756', '408559', '376862', '219161', '381174', '198572', '368278', '386780', '329842', '360381', '369586', '385128', '391574', '394214', '406279', '361388', '416348', '417605', '354041', '400962', '369154', '346537', ]
const labels =   ['ST PRIORITY', 'Constellation', 'Night Owl Turbo', 'Hercules', 'SunTime', 'Expensivebuyer', 'Auto-Tortoise 2X', 'RoboCop 2020 x 2', 'Moriarti', 'Miracletrading new', 'Sunnich M v2', 'Method_from_Bakir', 'RM CLUB',  'Greedy', 'A L', 'TARB-1', 'Hedger', 'Bablorubilnik' , 'Cobalt', 'Sunnich NR v.2-1', 'EURUSD H1', 'MAGI01' ]

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
