import React from "react";
import { Menu, Icon, Popover } from "antd";
import "./index.less";
import history from "@/router/history";
import routes from "@/router/routes";
import { connect } from "react-redux";
import {logout} from '@/redux/admin.redux.js'
const SubMenu = Menu.SubMenu;
@connect(
  state => state.admin,
  {
    logout
  }
)
class NavLeft extends React.Component {
  handleClickMenu = ({ key }) => {
    history.push(key);
  };
  returnItems = () => {
    let routeMenus = routes.slice(0, 5);
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
        );
      } else {
        return (
          <Menu.Item key={item.path}>
            <Icon type={item.iconType} />
            <span>{item.title}</span>
          </Menu.Item>
        );
      }
    });
  };
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    let item = routes.slice(0, 5).find(item => {
      return history.location.pathname.indexOf(item.path) !== -1;
    });
    return (
      <div className="navLeft">
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
          <div className="avatarCard">
            <img src={this.props.avatar} alt="" className="avatarImg" />
            <div className="avatarCardName">{this.props.userName}</div>
          </div>
        </Popover>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[(item && item.path) || ""]}
          onClick={this.handleClickMenu}
        >
          {this.returnItems()}
        </Menu>
      </div>
    );
  }
}
export default NavLeft;
