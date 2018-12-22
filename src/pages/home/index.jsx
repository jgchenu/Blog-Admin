import React from 'react'
import { connect } from 'react-redux'
import './index.less'
@connect(state => state.admin)
class Home extends React.Component {
  state = {}
  render() {
    return (
      <div className="page-home">
        欢迎您，
        {this.props.userName}【博主】
        <br />^ _ ^
      </div>
    )
  }
}

export default Home
