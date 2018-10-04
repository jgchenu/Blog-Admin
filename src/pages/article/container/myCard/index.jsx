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
  goDetail(id) {
    history.push(`/admin/editArticle/${id}`);
  }

  render() {
    let list = this.props.list;
    let content = list.content ? list.content.value : "";
    content = content.length > 30 ? content.substring(0, 100) : content;
    return (
      <div className="myCard" onClick={this.goDetail.bind(this, list.id)}>
        <Card title={list.title} style={{ width: "100%" }}>
          <div
            className="content"
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
