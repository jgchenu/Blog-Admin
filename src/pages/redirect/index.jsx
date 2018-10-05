import React from "react";
import  history  from "@/router/history";
class MyRedirect extends React.Component {
  state = {};
  redirect = () => {
    history.push("/admin/home");
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
  render() {
    this.redirect();
    return null;
  }
}

export default MyRedirect;
