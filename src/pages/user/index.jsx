import React from "react";
import { Button, message, Upload, Icon } from "antd";
import { updateAvatar } from "@/redux/admin.redux";
import { connect } from "react-redux";
import E from "wangeditor";
import "./index.less";
@connect(
  state => state.admin,
  { updateAvatar }
)
class EditUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false
    };
  }
  handleSubmit = () => {
    this.props.updateInfo({ introduction: this.state.introduction });
  };
  initEdit = () => {
    const elem = this.refs.editorElem;
    this.editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = html => {
      this.setState({
        introduction: html
      });
    };
    this.editor.create();
  };
  loadData = () => {
    setTimeout(() => {
      this.editor.txt.html(this.props.introduction);
    }, 200);
  };
  componentDidMount() {
    this.initEdit();
    this.loadData();
  }

  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPG) {
      message.error("你只能选择图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过2M");
    }
    return isJPG && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        loading: false
      });
      if (info.file.response.code === 200) {
        this.props.updateAvatar(info.file.response);
      }
    }
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="editPerson">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={
            process.env.NODE_ENV === "development"
              ? "http://localhost:8000/api/user/editAvatar"
              : "/api/user/editAvatar"
          }
          headers={{
            Authorization: "Bearer " + localStorage.getItem("token")
          }}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {this.props.avatar ? (
            <img src={this.props.avatar} alt="avatar" className="ant-upload" />
          ) : (
            uploadButton
          )}
        </Upload>
        <div className="content">
          <div ref="editorElem" style={{ textAlign: "left" }} />
        </div>
        <div className="button">
          <Button type="primary" onClick={this.handleSubmit}>
            更新
          </Button>
        </div>
      </div>
    );
  }
}

export default EditUser;
