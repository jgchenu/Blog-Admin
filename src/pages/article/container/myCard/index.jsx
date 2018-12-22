import React from 'react'
import { Card, Modal,message } from 'antd'
import history from '@/router/history'
import MyTag from '@/components/myTag/index'
import api from '@/lib/api'
import './index.less'
const confirm = Modal.confirm
export default class MyCard extends React.Component {
  static defaultProps = {
    list: { content: { value: '' } }
  }
  handleToEdit = id => {
    history.push(`/admin/editArticle/${id}`)
  }
  handletoDetail = id => {
    history.push(`/admin/detail/${id}`)
  }
  handleDeleteConfirm = id => {
    confirm({
      title: '你确定要删除以下这篇文章？',
      content: this.props.list.title,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const res = await api.deleteArticleById(id)
        if (res.data.code === 0) {
          this.props.onLoadData()
        }
      },
      onCancel: () => {
        message.info('取消删除文章')
      }
    })
  }
  render() {
    let list = this.props.list
    return (
      <div className="page-article-card">
        <Card title={list.title} style={{ width: '100%' }}>
          <footer className="page-article-card-footer">
            <div className="page-article-card-footer-tags">
              <MyTag tags={list.tags} />
            </div>
            <div
              className="page-article-card-footer-detail"
              onClick={() => this.handletoDetail(list.id)}
            >
              查看
            </div>
            <div
              className="page-article-card-footer-edit"
              onClick={() => this.handleToEdit(list.id)}
            >
              编辑
            </div>
            <div
              className="page-article-card-footer-delete"
              onClick={() => this.handleDeleteConfirm(list.id)}
            >
              删除
            </div>
          </footer>
        </Card>
      </div>
    )
  }
}
