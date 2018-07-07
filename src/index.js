import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { accounts } from './fixtures'
import 'bootstrap/dist/css/bootstrap.min.css'

render(<App accounts = { accounts } />, document.getElementById('root'))
registerServiceWorker()