import React from "react";
import { List, Avatar, Pagination } from "antd";
import api from "@/lib/api";
import getPage from "@/lib/getPage";
import history from "@/router/history";
import "./index.less";
const { articleComment } = api;
class Comment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      allCount: 0,
      data: []
    };
  }
  componentWillMount() {
    this.page = getPage();
    this.loadData(this.page, 10);
  }

  loadData = (page = 1, pageSize = 10) => {
    this.$axios({
      url: articleComment,
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
    document.scrollingElement.scrollTop = 0;
    history.push(`/admin/comment/?page=${page}`);
    this.page = getPage();
    this.loadData(page, pageSize);
  };
  handleToDetail = id => {
    history.push(`/admin/detail/${id}`);
  };
  handleRenderItem = item => {
    return (
      <List.Item className="comment">
        <List.Item.Meta
          avatar={<Avatar src={item.sayUser.avatar} />}
          title={<a>{item.sayUser.userName}</a>}
          description={
            <div>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
              <div
                className="articleTitle"
                onClick={() => this.handleToDetail(item.article.id)}
              >
                <strong>文章:</strong>
                <span>{item.article.title}</span>
              </div>
            </div>
          }
        />
      </List.Item>
    );
  };
  

  render() {
    return (
      <div className="myComment">
        <List
          header={null}
          itemLayout="horizontal"
          dataSource={this.state.indexList}
          renderItem={this.handleRenderItem}
        />
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

export default Comment;
