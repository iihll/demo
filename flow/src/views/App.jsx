import React from 'react'
import FlowGraph from './Grapth'
import './App.less'

let graph

class App extends React.Component {
  init = () => {
    graph = FlowGraph.init()
  }

  componentDidMount() {
    this.init()
  }

  render() {
    return (
      <div className="app">
        <div id="container"></div>
      </div>
    )
  }
}

export default App
