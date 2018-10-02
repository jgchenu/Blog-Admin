import React from "react";
import MyTag from "@/components/myTag";
import api from "@/api.js";
const { tag } = api;
class Archive extends React.Component {
  state = {
    tags: []
  };
  componentWillMount() {
    this.$axios({
      url: tag,
      method: "get"
    }).then(res => {
      console.log(res);
      this.setState({
        tags: res.data.data
      });
    });
  }
  render() {
    return (
      <div>
        <MyTag tags={this.state.tags}/>
      </div>
    );
  }
}

export default Archive;
