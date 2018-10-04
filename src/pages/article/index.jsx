import React from "react";
import "./index.less";
import MyCard from "./container/myCard";
import api from "@/api";
import { Pagination } from "antd";
const { article } = api;
class Article extends React.Component {
  state = {
    indexList: [],
    allCount: 0
  };
  componentWillMount() {
    this.page = sessionStorage.getItem("page") || 1;
    sessionStorage.setItem("page", this.page);
    this.loadData(this.page);
  }
  loadData = (page = 1, pageSize = 10) => {
    this.$axios({
      url: article,
      method: "get",
      params: {
        page,
        pageSize
      }
    }).then(res => {
      console.log(res);
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      });
    });
  };
  onChange = (page, pageSize) => {
    this.page = page;
    sessionStorage.setItem("page", this.page);
    this.loadData(page, pageSize);
  };
  render() {
    return (
      <div className="home">
        <div className="lists">
          {this.state.indexList.map((item, index) => (
            <MyCard list={item} key={index} />
          ))}
        </div>
        <div className="footer">
          <Pagination
            defaultCurrent={parseInt(this.page,10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Article;
