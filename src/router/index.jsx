import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import App from "@/App.jsx";
import Article from "@/pages/article/index";
import WriteArticle from "@/pages/writeArticle/index";
import Tags from "@/pages/tags/index";
import EditArticle from "@/pages/editArticle/index";
import Comment from "@/pages/comment/index";
import User from "@/pages/user/index";
import Home from "@/pages/home/index";
import MessageBoard from "@/pages/messageBoard/index";
import Detail from "@/pages/detail/index";
import NotFound from "@/pages/notFound/index";
import Login from "@/pages/login/index";
import history from "./history";
import MyRedirect from "@/pages/redirect/index";
import TagArticle from "@/pages/tagArticle/index";
import AuthRoute from "@/pages/auth/index";
export default class MyRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/admin"
            render={() => (
              <App>
                <AuthRoute />
                <Switch>
                  <Route path="/admin/home" component={Home} />
                  <Route path="/admin/tags" component={Tags} />
                  <Route path="/admin/article" component={Article} />
                  <Route
                    path="/admin/tagArticle/:name"
                    component={TagArticle}
                  />
                  <Route path="/admin/writeArticle" component={WriteArticle} />
                  <Route
                    path="/admin/editArticle/:id"
                    component={EditArticle}
                  />
                  <Route path="/admin/detail/:id" component={Detail} />
                  <Route path="/admin/comment" component={Comment} />
                  <Route path="/admin/messageBoard" component={MessageBoard} />
                  <Route path="/admin/user" component={User} />
                  <Route component={MyRedirect} />
                  <Route component={NotFound} />
                </Switch>
              </App>
            )}
          />
          <Route path="/login" component={Login} />
          <Route component={MyRedirect} />
        </Switch>
      </Router>
    );
  }
}
