import React from "react";
import { Button, message } from "antd";
import api from "@/lib/api.js";
import E from "wangeditor";
import "./index.less";
const { person } = api;
class EditUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      introduction: ""
    };
  }
  handleSubmit = () => {
    this.$axios({
      url: `${person}`,
      method: "put",
      data: {
        introduction: this.state.introduction
      }
    }).then(res => {
      if (res.data.code === 200) {
        message.success("更新成功", 1);
      }
    });
  };
  initEdit = () => {
    const elem = this.refs.editorElem;
    this.editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = html => {
      this.setState({
        introduction: html
      });
    };
    this.editor.create();
  };
  loadData = () => {
    this.$axios({
      url: person,
      method: "get"
    }).then(res => {
      if (res.data.code === 200) {
        this.setState(
          {
            introduction: res.data.data.introduction
          },
          () => {
            this.editor.txt.html(this.state.introduction);
          }
        );
      }
    });
  };
  componentDidMount() {
    this.initEdit();
    this.loadData();
  }
  render() {
    return (
      <div className="editArticle">
        <div className="content">
          <div ref="editorElem" style={{ textAlign: "left" }} />
        </div>
        <div className="button">
          <Button type="primary" onClick={this.handleSubmit}>
            更新
          </Button>
        </div>
      </div>
    );
  }
}

export default EditUser;
