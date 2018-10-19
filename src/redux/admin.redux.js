import axios from "@/axios/index";
import {
    message
} from "antd";
import history from '@/router/history'
//action
const LOGOUT = "admin/logout";
const LOAD_DATA = "admin/loadData";
const initState = {
    avatar: "",
    userName: ""
};

//action type
//更新个人信息
function infoAdminData(data) {
    return {
        type: LOAD_DATA,
        payload: data
    };
}


export function admin(state = initState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload
            };
        case LOGOUT:
            return initState
        default:
            return state;
    }
}

//登录
export function login(data) {
    return dispatch => {
        axios({
            url: "/admin/login",
            method: "post",
            data
        }).then(res => {
            message.success(res.data.message, 1);
            if (res.data.code === 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("token_exp", new Date().getTime());
                dispatch(infoAdminData(res.data));
                history.push("/admin/home");
            }
        });
    };
}
//登出清除
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    history.push('/login')
    return {
        type: LOGOUT
    };
}
//获取个人信息
export function getAdminInfo() {
    return dispatch => {
        axios({
            url: "/admin",
            methods: "get"
        }).then(res => {
            if (res.data.code === 200) {
                dispatch(infoAdminData(res.data.data));
            } else {
                message.warn(res.data.message, 1);
            }
        });
    };
}
//更新用户头像
export function updateAvatar(data) {
    message.success("更新头像成功", 1);
    return infoAdminData(data)
}
//更新用户信息
export function updateInfo(data) {
    return dispatch => {
        axios({
            url: '/admin',
            method: "put",
            data
        }).then(res => {
            if (res.data.code === 200) {
                message.success("更新成功", 1);
                dispatch(infoAdminData(res.data.data))
            }
        });
    }

}