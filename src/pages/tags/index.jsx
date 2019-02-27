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
  //转为数组元素并且去重统计数量
  handleTagAndCount=(tags)=>{
    let arr=[];
    tags.forEach(item=>{
      arr=arr.concat(item.name.split(','))
    })
    let newTags={};
    for(let i=0;i<arr.length;i++){
      if(newTags[arr[i]]){
        newTags[arr[i]]++;
      }else{
        newTags[arr[i]]=1;
      }
    }
    arr=[];
    for(let key in newTags){
      if(newTags.hasOwnProperty(key)){
        arr.push({
          name:key,
          count:~~(newTags[key])
        })
      }
    }
    return arr;
  }
  render() {
    return (
      <div>
        <MyTag tags={this.handleTagAndCount(this.state.tags)} />
      </div>
    )
  }
}

export default Archive
