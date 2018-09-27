import React from "react";
import { Menu, Icon } from "antd";
import "./index.less";
import history from "../../router/history";
import routes from "../../router/routes";
class NavLeft extends React.Component {
  handleClickMenu = ({ key }) => {
    console.log(key);
    history.push(key);
  };
  returnItems = () => {
    let routeMenus = routes.slice(0, 6);
    return routeMenus.map(item => (
      <Menu.Item key={item.path}>
        <Icon type={item.iconType} />
        <span>{item.title}</span>
      </Menu.Item>
    ));
  };
  render() {
    return (
      <div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/admin/home']}
          onClick={this.handleClickMenu}
        >
          {this.returnItems()}
        </Menu>
      </div>
    );
  }
}
export default NavLeft;
