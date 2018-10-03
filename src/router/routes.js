export default [{
        path: "/admin/home",
        title: "首页",
        iconType: 'home'
    },
    {
        path: "/admin/article",
        title: "文章",
        iconType: 'hourglass',
        children: [{
            path: "/admin/article",
            title: "所有文章",
            iconType: 'hourglass',
        }, {
            path: "/admin/writeArticle",
            title: "写文章",
            iconType: 'hourglass',
        }, {
            path: "/admin/tags",
            title: "标签",
            iconType: 'tags',
        }]
    },
    {
        path: '/admin/comment',
        title: "评论",
        iconType: 'edit'
    },
    {
        path: "/admin/user",
        title: "个人",
        iconType: 'user'
    },
    {
        path: "/admin/messageBoard",
        title: "留言板",
        iconType: 'edit'
    }, {
        path: '/admin/detail',
        title: '详情'
    },
    {
        path: "/admin/writeArticle",
        title: "写文章",
        iconType: 'hourglass',
    }, {
        path: "/admin/tags",
        title: "标签",
        iconType: 'tags',
    },
    {
        path: "/admin/edit",
        title: "编辑",
        iconType: 'edit',
    }
]