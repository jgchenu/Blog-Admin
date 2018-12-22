import React from 'react'
import MyTag from '@/components/myTag'
import E from 'wangeditor'
import './index.less'
import { Card, Button, Avatar, message, List } from 'antd'
import api from '@/lib/api'
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indexList: { content: { value: '' } },
      id: this.props.match.params.id,
      editorContent: '',
      allCount: 0,
      data: [],
      applyPerson: {},
      commentId: ''
    }
  }
  componentDidMount() {
    this.loadData()
    this.initEdit()
  }
  loadData = async () => {
    const res = await api.getArticleById(this.state.id)
    if (res.data.code === 0) {
      this.setState({
        indexList: res.data.data,
        data: res.data.data.comments
      })
    }
  }
  initEdit = () => {
    const elem = this.refs.editorElem
    this.editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    this.editor.create()
  }
  handleRenderItem = item => {
    return (
      <div>
        <List.Item className="page-detail-comments-item">
          <List.Item.Meta
            avatar={<Avatar src={item.sayUser.avatar} />}
            title={<a>{item.sayUser.userName}{item.sayUser.authority===1?'【博主】':'【用户】'}</a>}
            description={
              <div>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <div
                  className="page-detail-comments-item-button"
                  onClick={() => this.handleApply(item.sayUser, item.id)}
                >
                  回复
                </div>
              </div>
            }
          />
        </List.Item>
        {item.apply.map((subItem, index) => (
          <List.Item className="page-detail-comments-item" key={index}>
            <List.Item.Meta
              avatar={<Avatar src={subItem.applySayUser.avatar} />}
              title={<a>{subItem.applySayUser.userName}{subItem.applySayUser.authority===1?'【博主】':'【用户】'}</a>}
              description={
                <div>
                  <strong>
                    @ <Avatar src={subItem.applyToUser.avatar} />
                    &nbsp;
                    {subItem.applyToUser.userName}{subItem.applyToUser.authority===1?'【博主】':'【用户】'}
                    &nbsp;&nbsp;&nbsp;
                  </strong>
                  <div dangerouslySetInnerHTML={{ __html: subItem.content }} />
                  <div
                    className="page-detail-comments-item-button"
                    onClick={() =>
                      this.handleApply(subItem.applySayUser, item.id)
                    }
                  >
                    回复
                  </div>
                </div>
              }
            />
          </List.Item>
        ))}
      </div>
    )
  }
  handleApply = (applyPerson, commentId) => {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight
    this.setState({
      applyPerson,
      commentId
    })
    this.editor.txt.html(this.state.editorContent)
  }
  handleCancelApply = () => {
    this.setState({
      applyPerson: {},
      commentId: ''
    })
  }
  handleSubmit = async () => {
    let requestData = {
      sayId: 1,
      commentType: 1,
      content: this.state.editorContent,
      articleId: this.state.indexList.id
    }
    if (this.state.commentId) {
      Object.assign(requestData, {
        toId: this.state.applyPerson.id,
        commentId: this.state.commentId
      })
    }
    const res = await api.subComment({
      data: requestData
    })
    if (res.data.code === 0) {
      this.handleCancelApply()
      this.loadData()
      this.editor.txt.clear()
      message.success('发布成功')
    }
  }

  render() {
    let content =
      this.state.indexList.content && this.state.indexList.content.value
    return (
      <div className="page-detail">
        <h2 className="page-detail-title">{this.state.indexList.title}</h2>
        <div
          className="page-detail-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="page-detail-tags">
          <MyTag tags={this.state.indexList.tags} />
        </div>
        <div className="page-detail-comments">
          <List
            header={<div>评论</div>}
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={this.handleRenderItem}
          />
        </div>
        <div className="page-detail-editor">
          <Card
            title={
              this.state.applyPerson.userName ? (
                <div>
                  回复 <Avatar src={this.state.applyPerson.avatar} />
                  &nbsp;
                  {this.state.applyPerson.userName}:
                  <a onClick={this.handleCancelApply}>&nbsp;&nbsp;取消</a>
                </div>
              ) : (
                '评论'
              )
            }
            bordered={false}
            style={{ width: '100%' }}
          >
            <div ref="editorElem" style={{ textAlign: 'left' }} />
            <div className="page-detail-editor-submit-button">
              <Button type="primary" onClick={this.handleSubmit}>
                发布
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Detail
