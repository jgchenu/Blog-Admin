import React from "react";
import history from "@/router/history";
import { message } from "antd";
class MyRedirect extends React.Component {
  state = {};
  auth = () => {
    let expire = localStorage.token_exp;
    if (expire < +Date.now()) {
      localStorage.clear();
      message.error("登录信息过期，请重新登录", 1, () => {
        history.push("/login");
      });
    } else {
      history.push("/admin/home");
    }
  };
  render() {
    this.auth();
    return null;
  }
}

export default MyRedirect;
