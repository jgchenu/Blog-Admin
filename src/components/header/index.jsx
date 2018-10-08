import React from "react";
import "./index.less";
import { Layout, Icon } from "antd";
import history from "../../router/history";
import routes from "../../router/routes";
const { Header } = Layout;
class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log(history);
    console.log(history.location.search)
  }
  state = {};
  goBack = () => {
    history.goBack();
  };
  render() {
    let item = routes.find(item => {
      return history.location.pathname.indexOf(item.path) !== -1;
    });
    return (
      <Header className="myHeader">
        <Icon
          type="left-circle"
          theme="twoTone"
          style={{ fontSize: 30, marginRight: 20, opacity: 0.8 }}
          onClick={this.goBack}
        />
        {item && item.title}
      </Header>
    );
  }
}
export default MyHeader;
