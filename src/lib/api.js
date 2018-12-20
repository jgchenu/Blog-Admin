// const api = {
//     article: '/article',
//     tag: '/tag',
//     admin: '/admin',
//     comment: '/comment',
//     articleComment: '/comment/article'
// }
// export default api;

import axios from './../axios'
const getArticles = (params) => axios({
    url: '/articles',
    method: 'get',
    params
})

const getArticleById = (id) => axios({
    url: `/articles/${id}`,
    method: 'get'
})
const editArticleById = ({
    id,
    data
}) => axios({
    url: `/articles/${id}`,
    method: 'put',
    data
})
const subComment = ({
    data
}) => axios({
    url: '/comments',
    method: 'post',
    data
})
const getBoardComments = (params) => axios({
    url: `/board/comments`,
    method: 'get',
    params
})
const getArticlesByTagName = (tag, params) => axios({
    url: `/tags/${tag}/articles`,
    method: 'get',
    params
})
const getTags = (params) => axios({
    url: '/tags',
    params
})
const getCommentsLinkArticles = (params) => axios({
    url: '/comments/articles',
    params
})
const api = {
    getArticles,
    getArticleById,
    editArticleById,
    subComment,
    getBoardComments,
    getArticlesByTagName,
    getTags,
    getCommentsLinkArticles
}
export default api;