import React from "react";
import "./index.less";
import { Layout } from "antd";
import history from "../../router/history";
import routes from "../../router/routes";
const { Header } = Layout;
class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log(history);
  }
  state = {};
  render() {
    let item = routes.find(item => {
      return history.location.pathname.indexOf(item.path) !== -1;
    });
    return <Header className="myHeader">{item && item.title}</Header>;
  }
}
export default MyHeader;
