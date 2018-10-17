import React from "react";
import { Menu, Icon } from "antd";
import "./index.less";
import history from "../../router/history";
import routes from "../../router/routes";
const SubMenu = Menu.SubMenu;

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
  render() {
    let item = routes.slice(0, 5).find(item => {
      return history.location.pathname.indexOf(item.path) !== -1;
    });
    return (
      <div>
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
