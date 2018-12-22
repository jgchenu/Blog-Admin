import React from 'react'
import MyCard from '@/pages/article/container/myCard'
import api from '@/lib/api'
import getParam from '@/lib/getParam'
import { Pagination } from 'antd'
import history from '@/router/history'
import './index.less'
class Article extends React.Component {
  state = {
    indexList: [],
    allCount: 0,
    name: this.props.match.params.name
  }
  componentDidMount() {
    this.setState(
      {
        page: getParam('page')
      },
      () => {
        this.loadData()
      }
    )
  }
  loadData = async () => {
    const params = { page: getParam('page') }
    const res = await api.getArticlesByTagName({
      name: encodeURIComponent(this.state.name),
      params
    })
    if (res.data.code === 0) {
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      })
    }
  }
  onChange = page => {
    document.scrollingElement.scrollTop = 0
    history.push(`/tagArticle/${this.state.name}?page=${page}`)
    this.setState(
      {
        page: getParam('page')
      },
      () => {
        this.loadData()
      }
    )
  }
  render() {
    return (
      <div className="page-tag-article">
        <div className="page-tag-article-lists">
          {this.state.indexList.map((item, index) => (
            <MyCard list={item} key={index} />
          ))}
        </div>
        <div className="page-tag-article-footer">
          <Pagination
            defaultCurrent={parseInt(getParam('page'), 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

export default Article
