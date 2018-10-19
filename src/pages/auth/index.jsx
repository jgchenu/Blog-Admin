import history from "@/router/history";
import { connect } from "react-redux";
import React from "react";
import { message } from "antd";
@connect(state => state.admin)
class AuthRoute extends React.Component {
  componentWillMount() {
    if (!localStorage.token)
      message.error("请重新登录", 1, () => {
        history.push("/login");
      });
  }
  render() {
    return null;
  }
}
export default AuthRoute;
