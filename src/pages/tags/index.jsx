import React from "react";
import MyTag from "@/components/myTag";
class Archive extends React.Component {
  state = {
    tags: [
      { tagName: "学习" },
      { tagName: "生活" },
      { tagName: "技术" },
      { tagName: "思考" },
      { tagName: "随笔" },
      { tagName: "javscript" },
      { tagName: "http" },
      { tagName: "linux" },
      { tagName: "nginx" },
      { tagName: "centos" },
    ]
  };
  render() {
    return (
      <div>
        <MyTag tags={this.state.tags} />
      </div>
    );
  }
}

export default Archive;
