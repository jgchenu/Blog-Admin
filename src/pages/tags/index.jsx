import React from 'react'
import MyTag from '@/components/myTag'
import api from '@/lib/api.js'
class Archive extends React.Component {
  state = {
    tags: []
  }
  componentDidMount() {
    this.loadData()
  }
  loadData = async () => {
    const res = await api.getTags()
    if (res.data.code === 0) {
      this.setState({
        tags: res.data.data
      })
    }
  }
  render() {
    return (
      <div>
        <MyTag tags={this.state.tags} />
      </div>
    )
  }
}

export default Archive
