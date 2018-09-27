import React from "react";
import "./index.less";
import MyCard from "./container/myCard";
import api from "@/mockApi/homeList";
import { Pagination, } from "antd";
class Article extends React.Component {
  state = {
    indexList: api
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
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    );
  }
}

export default Article;
