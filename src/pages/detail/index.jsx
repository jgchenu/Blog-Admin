import React from "react";
import MyTag from "@/components/myTag";
import api from "@/mockApi/homeList";
import "./index.less";
import { Card, Input, Button } from "antd";
const { TextArea } = Input;
class Detail extends React.Component {
  state = {
    indexList: api
  };
  render() {
    const id = this.props.match.params.id;
    return (
      <div id="myDetail">
        <h2 className="title">{this.state.indexList[id].title}</h2>
        <div className="content">{this.state.indexList[id].content}</div>
        <div className="tags">
          <MyTag tags={this.state.indexList[id].tags} />
        </div>
        <div className="comment">
          <Card title="评论" bordered={true} style={{ width: "100%" }}>
            <TextArea rows={4} />
            <div className="button">
              <Button type="primary">发布</Button>
            </div>
          </Card>
        </div>
        <div className="footer">
          <div className="before">上一页</div>
          <div className="after">下一页</div>
        </div>
      </div>
    );
  }
}

export default Detail;
