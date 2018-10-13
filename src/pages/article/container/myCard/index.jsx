import React from "react";
import { Card, Modal } from "antd";
import "./index.less";
import history from "@/router/history";
import MyTag from "@/components/myTag/index";
const confirm = Modal.confirm;
export default class MyCard extends React.Component {
  static defaultProps = {
    list: { content: { value: "" } }
  };
  handleToEdit = ( id) => {
    // if (event.target.className.indexOf("ant-tag") !== -1) {
    //   const name = event.target.innerText;
    //   sessionStorage.setItem("page", 1);
    //   history.push(`/admin/tagArticle/${name}`);
    //   return;
    // }
    history.push(`/admin/editArticle/${id}`);
  };
  handletoDetail = id => {
    history.push(`/admin/detail/${id}`);
  };
  handleDeleteConfirm = () => {
    confirm({
      title: "你确定要删除以下这篇文章？",
      content: this.props.list.title,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  render() {
    let list = this.props.list;
    return (
      <div className="myCard">
        <Card title={list.title} style={{ width: "100%" }}>
          <footer className="cardFooter">
            <div className="tags">
              <MyTag tags={list.tags} />
            </div>
            <div
              className="articleDetail"
              onClick={() => this.handletoDetail(list.id)}
            >
              查看
            </div>
            <div
              className="articleEdit"
              onClick={() => this.handleToEdit(list.id)}
            >
              编辑
            </div>
            <div className="articleDelete" onClick={this.handleDeleteConfirm}>
              删除
            </div>
          </footer>
        </Card>
      </div>
    );
  }
}
