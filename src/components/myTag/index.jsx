import React from "react";
import { Tag } from "antd";
import './index.less'
class MyTag extends React.Component {
  tagColors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple"
  ];
  renderTags = tags =>
    tags.map((item, index) => (
      <Tag color={this.tagColors[index]} key={index}>
        {item.tagName}
      </Tag>
    ));

  render() {
    return <div className="myTags">{this.renderTags(this.props.tags)}</div>;
  }
}

export default MyTag;
