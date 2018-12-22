import React from "react";
import { Layout, BackTop, Icon } from "antd";
import NavLeft from "./components/navLeft/index";
import MyHeader from "./components/header/index";
import { connect } from "react-redux";
import { getAdminInfo } from "@/redux/admin.redux.js";
import "./styles/App.less";
const { Content, Sider } = Layout;
@connect(
  state => state.admin,
  { getAdminInfo }
)
class App extends React.Component {
  state = {};
  componentWillMount() {
    this.props.getAdminInfo();
  }
  render() {
    return (
      <Layout className="app-container">
        <Sider className="app-container-left">
          <NavLeft />
        </Sider>
        <Layout className="app-container-right">
          <MyHeader />
          <Content className="app-container-right-content">
            {this.props.children}
            <BackTop>
              <div className="ant-back-top-inner">
                <Icon type="caret-up" theme="outlined" />
              </div>
            </BackTop>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
