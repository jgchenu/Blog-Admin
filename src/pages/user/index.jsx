import React from "react";
import { Button, message, Upload, Icon } from "antd";
import api from "@/lib/api.js";
import E from "wangeditor";
import "./index.less";
const { person } = api;


class EditUser extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false,
      introduction: ""
    };
  }
  handleSubmit = () => {
    this.$axios({
      url: `${person}`,
      method: "put",
      data: {
        introduction: this.state.introduction
      }
    }).then(res => {
      if (res.data.code === 200) {
        message.success("更新成功", 1);
      }
    });
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
    this.$axios({
      url: person,
      method: "get"
    }).then(res => {
      if (res.data.code === 200) {
        this.setState(
          {
            introduction: res.data.data.introduction
          },
          () => {
            this.editor.txt.html(this.state.introduction);
          }
        );
      }
    });
  };
  componentDidMount() {
    this.initEdit();
    this.loadData();
  }

   getBase64=(img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
   beforeUpload=(file) =>{
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJPG && isLt2M;
  }

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      console.log(info)
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    return (
      <div className="editPerson">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://localhost:8000/person/editAvatar"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" className='ant-upload' /> : uploadButton}
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
