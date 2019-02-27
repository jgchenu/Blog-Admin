import React from "react";
import history from "@/router/history";
class MyRedirect extends React.Component {
  state = {};
  auth = () => {
    history.push("/home");
  };
  render() {
    this.auth();
    return null;
  }
}

export default MyRedirect;
