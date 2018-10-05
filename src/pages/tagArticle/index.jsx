import React from "react";
import "./index.less";
import MyCard from "@/pages/article/container/myCard";
import api from "@/lib/api";
import { Pagination } from "antd";
import history from "@/router/history";
const { article, tag } = api;
class Article extends React.Component {
  state = {
    indexList: [],
    allCount: 0,
    name: this.props.match.params.name
  };
  componentWillMount() {
    this.page = sessionStorage.getItem("page") || 1;
    sessionStorage.setItem("page", this.page);
    this.loadData(this.page, 10,this.state.name);
  }
  loadData = (page = 1, pageSize = 10, name = "测试") => {
    if (/^\/admin\/tagArticle\/.*/.test(history.location.pathname)) {
      this.getTagArticle(page, pageSize, name);
    } else {
      this.getALlArticle(page, pageSize);
    }
  };
  getTagArticle = (page, pageSize = 10, name) => {
    this.$axios({
      url: `${tag}/${name}`,
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
  getALlArticle = (page, pageSize = 10) => {
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
    this.loadData(page, pageSize,this.state.name);
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
            defaultCurrent={parseInt(this.page, 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Article;
