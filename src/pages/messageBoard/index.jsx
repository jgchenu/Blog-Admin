import React from "react";
import E from "wangeditor";
import { Button, List, Avatar } from "antd";
import "./index.less";
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];
class Archive extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: ""
    };
    this.clickHandle = this.clickHandle.bind(this);
  }
  clickHandle() {
    alert(this.state.editorContent);
  }
  componentDidMount() {
    const elem = this.refs.editorElem;
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      });
    };
    editor.create();
  }
  render() {
    return (
      <div className="messageBoard">
        <h2>我想是时候开个留言板让大家吐槽了:)</h2>
        <div className="boardContent">
          <List
            header={<div>评论</div>}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div>
        <div className="editor">
          <div ref="editorElem" style={{ textAlign: "left" }} />
          <div className="button">
            <Button type="primary" onClick={this.clickHandle}>
              获取内容
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Archive;
