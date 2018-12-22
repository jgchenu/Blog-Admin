import React from "react";
import "./index.less";
import { Form, Icon, Input, Button } from "antd";
import { connect } from "react-redux";
import { login } from "@/redux/admin.redux.js";

const bgImage = "http://test.jgchen.xin/blog/bg.jpg";
const FormItem = Form.Item;
@connect(
  state => state.admin,
  { login }
)
class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <img className="page-login-bg" src={bgImage} alt="背景图片" />
        <div className="page-login-content">
          <Form onSubmit={this.handleSubmit} className="page-login-content-form">
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="page-login-content-form-button"
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
