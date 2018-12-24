import React from 'react'
import { Menu, Icon, Popover } from 'antd'
import './index.less'
import history from '@/router/history'
import routes from '@/router/routes'
import { connect } from 'react-redux'
import { logout } from '@/redux/admin.redux.js'
const SubMenu = Menu.SubMenu
@connect(
  state => state.admin,
  {
    logout
  }
)
class NavLeft extends React.Component {
  state = {
    musicShow: false
  }
  handleClickMenu = ({ key }) => {
    this.props.onHideNavLeft()
    history.push(key)
  }
  returnItems = () => {
    let routeMenus = routes.slice(0, 5)
    return routeMenus.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type={item.iconType} />
                <span>{item.title}</span>
              </span>
            }
          >
            {item.children.map(menuItem => (
              <Menu.Item key={menuItem.path}>
                <Icon type={menuItem.iconType} />
                <span>{menuItem.title}</span>
              </Menu.Item>
            ))}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={item.path}>
            <Icon type={item.iconType} />
            <span>{item.title}</span>
          </Menu.Item>
        )
      }
    })
  }
  handleLogout = () => {
    this.props.logout()
  }
  handleShowMusic = () => {
    this.setState({
      musicShow: true
    })
  }
  handleHideMusic = () => {
    this.setState({
      musicShow: false
    })
  }
  render() {
    let item = routes.slice(0, 5).find(item => {
      return history.location.pathname.indexOf(item.path) !== -1
    })
    return (
      <div className="components-nav-left">
        <div className="components-avatar-card">
          <Popover
            content={
              <div>
                <div onClick={this.handleLogout}>
                  <a>注销</a>
                </div>
              </div>
            }
            title={<div>{this.props.userName}</div>}
            trigger="hover"
            placement="right"
          >
            <img
              src={this.props.avatar}
              alt=""
              className="components-avatar-card-img"
            />
          </Popover>
          <div className="components-avatar-card-name">
            博主：{this.props.userName}
          </div>
          <Icon
            onClick={this.handleShowMusic}
            type="customer-service"
            theme="twoTone"
            className="app-container-left-show-music-button"
            style={{
              fontSize: 20,
              position: 'absolute',
              left: '20px',
              top: '20px'
            }}
          />
          <Icon
            onClick={this.props.onHideNavLeft}
            type="close-circle"
            theme="twoTone"
            className="app-container-left-show-button"
            style={{
              fontSize: 30,
              position: 'absolute',
              right: '18px',
              top: '18px'
            }}
          />
        </div>

        <div
          className={`components-nav-left-music ${
            this.state.musicShow
              ? 'components-nav-left-music-show'
              : 'components-nav-left-music-hide'
          }`}
        >
          <Icon
            onClick={this.handleHideMusic}
            type="close-circle"
            theme="twoTone"
            className="app-container-left-show-music-button"
            style={{
              fontSize: 20,
              position: 'absolute',
              left: '18px',
              top: '18px'
            }}
          />
          <iframe
            frameBorder="no"
            border="0"
            marginWidth="0"
            marginHeight="0"
            title="陈建光的火影歌单"
            width={260}
            height={500}
            src="//music.163.com/outchain/player?type=0&id=409631476&auto=1&height=500"
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[(item && item.path) || '']}
          onClick={this.handleClickMenu}
        >
          {this.returnItems()}
        </Menu>
      </div>
    )
  }
}
export default NavLeft
