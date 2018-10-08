import React from "react";
import E from "wangeditor";
import { Button, List, Avatar, Pagination, Card } from "antd";
import api from "@/lib/api";
import "./index.less";

const { comment } = api;

class MessageBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: "",
      allCount: 10,
      data: []
    };
  }
  componentWillMount() {
    this.loadData();
  }
  clickHandle = () => {
    alert(this.state.editorContent);
  };
  loadData = () => {
    this.$axios({
      url: `${comment}/board`,
      method: "get"
    }).then(res => {
      console.log(res);
      if (res.data.code === 200) {
        this.setState({
          data: res.data.data
        });
      }
    });
  };
  initEdit = () => {
    const elem = this.refs.editorElem;
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      });
    };
    editor.create();
  };

  componentDidMount() {
    this.initEdit();
  }
  render() {
    return (
      <div className="messageBoard">
        <h2>我想是时候开个留言板让大家吐槽了:)</h2>
        <div className="boardContent">
          <List
            header={<div>评论</div>}
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
              <div>
                <List.Item className="comment">
                  <List.Item.Meta
                    avatar={<Avatar src={item.sayUser[0].avatar} />}
                    title={
                      <a>{item.sayUser[0].userName}</a>
                    }
                    description={
                      <div>
                        {item.content}
                        <br />
                        <div
                          className="applyButton"
                          onClick={() => this.handleApply(item.sayUser.id)}
                        >
                          回复
                        </div>
                      </div>
                    }
                  />
                </List.Item>
                {item.apply.map((subItem, index) => (
                  <List.Item className="apply" key={index}>
                    <List.Item.Meta
                      avatar={<Avatar src={subItem.applySayUser[0].avatar} />}
                      title={
                        <a>
                          {subItem.applySayUser[0].userName}
                        </a>
                      }
                      description={
                        <div>
                          <strong>
                            @{subItem.applyToUser[0].userName}
                            &nbsp;&nbsp;&nbsp;
                          </strong>
                          {subItem.content}
                          <br />
                          <div className="applyButton">回复</div>
                        </div>
                      }
                    />
                  </List.Item>
                ))}
              </div>
            )}
          />
        </div>
        <div className="editor">
          <Card title="评论" bordered={false} style={{ width: "100%" }}>
            <div ref="editorElem" style={{ textAlign: "left" }} />
            <div className="button">
              <Button type="primary">发布</Button>
            </div>
          </Card>
        </div>

        <div className="footer">
          <Pagination
            defaultCurrent={parseInt(1, 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default MessageBoard;
