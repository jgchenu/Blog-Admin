import axios from './../axios'
//获取所有文章
const getArticles = (params) => axios({
    url: '/articles',
    method: 'get',
    params
})
//根据文章id获取文章详情
const getArticleById = (id) => axios({
    url: `/articles/${id}`,
    method: 'get'
})
//发布文章
const subArticle = (data) => axios({
    url: '/articles',
    method: 'post',
    data
})
//根据文章id修改文章
const editArticleById = ({
    id,
    data
}) => axios({
    url: `/articles/${id}`,
    method: 'put',
    data
})
const deleteArticleById = (id) => axios({
    url: `/articles/${id}`,
    method: 'delete'
})
//发布评论
const subComment = ({
    data
}) => axios({
    url: '/comments',
    method: 'post',
    data
})
//获取留言板评论
const getBoardComments = (params) => axios({
    url: `/board/comments`,
    method: 'get',
    params
})
//根据标签 名称 获取对应的文章
const getArticlesByTagName = ({
    name,
    params
}) => axios({
    url: `/tags/${name}/articles`,
    method: 'get',
    params
})
//获取所有标签
const getTags = (params) => axios({
    url: '/tags',
    params
})
//根据评论获取对应的文章
const getCommentsLinkArticles = (params) => axios({
    url: '/comments/articles',
    params
})
//获取管理员的信息
const getAdminInfo = () => axios({
    url: '/adminInfo',
    method: 'get'
})
//修改管理员的信息
const updateAdminInfo = (data) => axios({
    url: '/adminInfo',
    method: 'put',
    data
})
const adminLogin = (data) => axios({
    url: '/adminLogin',
    method: 'post',
    data
})

const api = {
    getArticles,
    getArticleById,
    editArticleById,
    subArticle,
    deleteArticleById,
    subComment,
    getBoardComments,
    getArticlesByTagName,
    getTags,
    getCommentsLinkArticles,
    getAdminInfo,
    updateAdminInfo,
    adminLogin,
}
export default api;