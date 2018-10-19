import React from "react";
import "./index.less";
import { connect } from "react-redux";
@connect(
  state=>state.admin
)
class Home extends React.Component {

  state = {};
  render() {
    return (
      <div className="adminHome">
        欢迎您，
        {this.props.userName}
      </div>
    );
  }
}

export default Home;
