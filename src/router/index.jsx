import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
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
export default class MyRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/admin"
            render={() => (
              <App>
                <Switch>
                  <Route path="/admin/home" component={Home} />
                  <Route path="/admin/tags" component={Tags} />
                  <Route path="/admin/article" component={Article} />
                  <Route path="/admin/writeArticle" component={WriteArticle} />
                  <Route path="/admin/editArticle" component={EditArticle} />
                  <Route path="/admin/edit/:id" component={WriteArticle} />
                  <Route path="/admin/detail/:id" component={Detail} />
                  <Route path="/admin/comment" component={Comment} />
                  <Route path="/admin/messageBoard" component={MessageBoard} />
                  <Route path="/admin/user" component={User} />
                  <Redirect to="/admin/home" />
                  <Route component={NotFound} />
                </Switch>
              </App>
            )}
          />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}
