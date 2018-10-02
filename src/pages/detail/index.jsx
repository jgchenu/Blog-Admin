import React from "react";
import MyTag from "@/components/myTag";
import "./index.less";
import { Card, Input, Button } from "antd";
import api from "@/api";
const { article } = api;
const { TextArea } = Input;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexList: { content: { value: "" } },
      id: this.props.match.params.id
    };
  }

  componentWillMount() {
    this.$axios({
      method: "get",
      url: `${article}/${this.state.id}`
    }).then(res => {
      console.log(res.data.data);
      this.setState({
        indexList: res.data.data
      });
    });
  }
  render() {
    let content =
      this.state.indexList.content && this.state.indexList.content.value;
    return (
      <div id="myDetail">
        <h2 className="title">{this.state.indexList.title}</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="tags">
          <MyTag tags={this.state.indexList.tags} />
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
