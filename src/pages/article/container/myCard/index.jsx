import React from "react";
import { Card, Modal } from "antd";
import "./index.less";
import history from "@/router/history";
import MyTag from "@/components/myTag/index";
import api from "@/lib/api";
const { article } = api;
const confirm = Modal.confirm;
export default class MyCard extends React.Component {
  static defaultProps = {
    list: { content: { value: "" } }
  };
  handleToEdit = id => {
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
  handleDeleteConfirm = id => {
    confirm({
      title: "你确定要删除以下这篇文章？",
      content: this.props.list.title,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk:()=>{
        this.$axios({
          url: `${article}/${id}`,
          method: "delete"
        }).then(res => {
          if (res.data.code === 200) {
            this.props.onLoadData(10);
          }
        });
      },
      onCancel:()=> {
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
            <div
              className="articleDelete"
              onClick={() => this.handleDeleteConfirm(list.id)}
            >
              删除
            </div>
          </footer>
        </Card>
      </div>
    );
  }
}
