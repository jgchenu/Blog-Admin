import React from "react";
import { Tag, Badge } from "antd";
import "./index.less";
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
  static defaultProps = {
    tags: []
  };
  renderTags = tags =>
    tags.map((item, index) => (
      <Badge
        count={item.count || 0}
        style={{
          backgroundColor: "#fff",
          color: "#999",
          boxShadow: "0 0 0 1px #d9d9d9 inset"
        }}
        className="singleTag"
        key={index}
      >
        <Tag
          color={this.tagColors[index]}
          key={index}
          style={{
            height: `${(item.count + 1) * 10}px`,
            lineHeight: `${(item.count + 1) * 10}px`,
            fontSize: `${(item.count + 1) * 4}px`,
            borderRadius: '8%'
          }}
        >
          {item.name}
        </Tag>
      </Badge>
    ));

  render() {
    return <div className="myTags">{this.renderTags(this.props.tags)}</div>;
  }
}

export default MyTag;
