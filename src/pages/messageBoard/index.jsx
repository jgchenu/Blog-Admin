import React from 'react'
import E from 'wangeditor'
import { Button, List, Avatar, Pagination, Card, message } from 'antd'
import api from '@/lib/api'
import getParam from '@/lib/getParam'
import './index.less'
import { Object } from 'core-js'
import history from '@/router/history'

class MessageBoard extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editorContent: '',
      allCount: 0,
      indexList: [],
      applyPerson: {},
      commentId: ''
    }
  }
  componentDidMount() {
    this.loadData()
    this.initEdit()
  }

  loadData = async () => {
    const res = await api.getBoardComments({ page: getParam('page') })
    if (res.data.code === 0) {
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
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
  onChange = page => {
    document.scrollingElement.scrollTop = 0
    history.push(`/admin/messageBoard/?page=${page}`)
    this.loadData()
  }
  handleRenderItem = item => {
    return (
      <div>
        <List.Item className="page-board-content-comment">
          <List.Item.Meta
            avatar={<Avatar src={item.sayUser.avatar} />}
            title={
              <a>
                {item.sayUser.userName}
                {item.sayUser.authority === 1 ? '【博主】' : '【用户】'}
              </a>
            }
            description={
              <div>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <div
                  className="page-board-content-apply-button"
                  onClick={() => this.handleApply(item.sayUser, item.id)}
                >
                  回复
                </div>
              </div>
            }
          />
        </List.Item>
        {item.apply.map((subItem, index) => (
          <List.Item className="page-board-content-apply" key={index}>
            <List.Item.Meta
              avatar={<Avatar src={subItem.applySayUser.avatar} />}
              title={
                <a>
                  {subItem.applySayUser.userName}
                  {subItem.applySayUser.authority === 1
                    ? '【博主】'
                    : '【用户】'}
                </a>
              }
              description={
                <div>
                  <strong>
                    @ <Avatar src={subItem.applyToUser.avatar} />
                    &nbsp;
                    {subItem.applyToUser.userName}
                    {subItem.applyToUser.authority === 1
                      ? '【博主】'
                      : '【用户】'}
                    &nbsp;&nbsp;&nbsp;
                  </strong>
                  <div dangerouslySetInnerHTML={{ __html: subItem.content }} />
                  <div
                    className="page-board-content-apply-button"
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
    this.editor.txt.html(this.state.editorContent)
    this.setState({
      applyPerson,
      commentId
    })
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
      commentType: 2,
      content: this.state.editorContent
    }
    if (this.state.commentId) {
      Object.assign(requestData, {
        toId: this.state.applyPerson.id,
        commentId: this.state.commentId
      })
    }
    const res = await api.subComment({ data: requestData })
    if (res.data.code === 0) {
      this.handleCancelApply()
      this.loadData()
      this.editor.txt.clear()
      message.success('发布成功')
    }
  }

  render() {
    return (
      <div className="page-board">
        <h2>我想是时候开个留言板让大家吐槽了:)</h2>
        <div className="page-board-content">
          <List
            header={<div>评论</div>}
            itemLayout="horizontal"
            dataSource={this.state.indexList}
            renderItem={this.handleRenderItem}
          />
        </div>
        <div className="page-board-editor">
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
            <div className="page-board-editor-button">
              <Button type="primary" onClick={this.handleSubmit}>
                发布
              </Button>
            </div>
          </Card>
        </div>

        <div className="page-board-footer">
          <Pagination
            defaultCurrent={parseInt(1, 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

export default MessageBoard
