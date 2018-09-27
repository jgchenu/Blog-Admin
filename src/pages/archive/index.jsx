import React from "react";
import { Timeline,Icon } from "antd";
import "./index.less";
import api from "@/mockApi/homeList";
import history from '@/router/history'

class Archive extends React.Component {
  state = { indexList: api };
  renderTimeItem=()=>{
    return (
      this.state.indexList.map((item,index)=>(
        <Timeline.Item key={index} onClick={this.goDetail.bind(this,item.id-1)} dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="blue">{item.title}</Timeline.Item>
      ))
    )
  }
  goDetail(id){
    history.push(`/detail/${id}`)
  }
  render() {
    return (
      <div className="archive">
        <Timeline mode="alternate">
            {this.renderTimeItem()}
        </Timeline>
      </div>
    );
  }
}

export default Archive;
