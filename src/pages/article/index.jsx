import React from "react";
import "./index.less";
import MyCard from "./container/myCard";
import api from "@/api";
import { Pagination } from "antd";
const { article } = api;
class Article extends React.Component {
  state = {
    indexList: []
  };
  componentWillMount() {
    this.$axios({
      method: "get",
      url: article
    }).then(res => {
      console.log(res);
      this.setState({
        indexList: res.data.data
      });
    });
  }
  
  render() {
    return (
      <div className="home">
        <div className="lists">
          {this.state.indexList.map((item, index) => (
            <MyCard list={item} key={index} />
          ))}
        </div>
        <div className="footer">
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    );
  }
}

export default Article;
