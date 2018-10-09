import React from "react";
import { Card } from "antd";
import "./index.less";
import history from "@/router/history";
import MyTag from "@/components/myTag/index";
export default class MyCard extends React.Component {
  constructor() {
    super();
    this.goDetail = this.goDetail.bind(this);
  }
  static defaultProps = {
    list: { content: { value: "" } }
  };
  goDetail = (event, id) => {
    if (event.target.className.indexOf("ant-tag") !== -1) {
      const name = event.target.innerText;
      sessionStorage.setItem("page", 1);
      history.push(`/admin/tagArticle/${name}`);
      return;
    }
    history.push(`/admin/editArticle/${id}`);
  };

  render() {
    let list = this.props.list;
    let content = list.content ? list.content.value : "";
    content = content.length > 30 ? content.substring(0, 100) : content;
    return (
      <div className="myCard" onClick={e => this.goDetail(e, list.id)}>
        <Card title={list.title} style={{ width: "100%" }}>
          <div
            className="mycontent"
            dangerouslySetInnerHTML={{ __html: content }}
          >
            {}
          </div>
          <footer className="cardFooter">
            <div className="tags">
              <MyTag tags={list.tags} />
            </div>
          </footer>
        </Card>
      </div>
    );
  }
}
