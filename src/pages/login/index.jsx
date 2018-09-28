import React from "react";
import "./index.less";
import { Form, Icon, Input, Button } from "antd";
const bgImage = "http://test.jgchen.xin/static/blog/2.jpg";
const FormItem = Form.Item;
class Login extends React.Component {
  state = {};
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="admin">
        <img className="loginBg" src={bgImage} alt="背景图片" />
        <div id="adminLogin">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
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
