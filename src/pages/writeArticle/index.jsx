import React from "react";
import { Input, Button, Tag, Tooltip, Icon } from "antd";
import E from "wangeditor";
import "./index.less";
class WriteArticle extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: "",
      tags: ["Unremovable", "Tag 2", "Tag 3"],
      inputVisible: false,
      inputValue: "",
      titleInputValue: ""
    };
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleTitleInput = e => {
    this.setState({ titleInputValue: e.target.value });
  };
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: ""
    });
  };
  saveInputRef = input => (this.input = input);
  clickHandle() {
    alert(this.state.editorContent);
  }
  initEdit() {
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
  componentDidMount() {
    this.initEdit();
  }
  render() {
    const { tags, inputVisible, inputValue,titleInputValue } = this.state;
    return (
      <div className="writeArticle">
        <div className="header">
          <h2>撰写新文章</h2>
          <Input
            size="large"
            placeholder="在此输入标题"
            onChange={this.handleTitleInput}
            value={titleInputValue}
          />
        </div>
        <div className="content">
          <div ref="editorElem" style={{ textAlign: "left" }} />
        </div>
        <div className="addTag">
          <h2>添加新标签</h2>
          {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable={true}
                afterClose={() => this.handleClose(tag)}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: "#fff", borderStyle: "dashed" }}
            >
              <Icon type="plus" /> New Tag
            </Tag>
          )}
        </div>
        <div className="button">
          <Button
            type="primary"
            onClick={() => {
              this.clickHandle();
            }}
          >
            获取内容
          </Button>
        </div>
      </div>
    );
  }
}

export default WriteArticle;
