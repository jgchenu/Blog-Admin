import React from 'react'
import { List, Avatar, Pagination } from 'antd'
import api from '@/lib/api'
import getParam from '@/lib/getParam'
import history from '@/router/history'
import './index.less'
class Comment extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      allCount: 0,
      data: []
    }
  }
  componentWillMount() {
    this.loadData()
  }

  loadData = async () => {
    const params = { page: getParam('page') }
    const res = await api.getCommentsLinkArticles(params)
    if (res.data.code === 0) {
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      })
    }
  }
  onChange = (page) => {
    document.scrollingElement.scrollTop = 0
    history.push(`/admin/comment/?page=${page}`)
    this.loadData()
  }
  handleToDetail = id => {
    history.push(`/admin/detail/${id}`)
  }
  handleRenderItem = item => {
    return (
      <List.Item className="comment">
        <List.Item.Meta
          avatar={<Avatar src={item.sayUser.avatar} />}
          title={<a>{item.sayUser.userName}</a>}
          description={
            <div>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
              <div
                className="articleTitle"
                onClick={() => this.handleToDetail(item.article.id)}
              >
                <strong>文章:</strong>
                <span>{item.article.title}</span>
              </div>
            </div>
          }
        />
      </List.Item>
    )
  }

  render() {
    return (
      <div className="myComment">
        <List
          header={null}
          itemLayout="horizontal"
          dataSource={this.state.indexList}
          renderItem={this.handleRenderItem}
        />
        <div className="footer">
          <Pagination
            defaultCurrent={parseInt(getParam('page'),10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

export default Comment
