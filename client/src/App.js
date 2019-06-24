import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";
import MainLayout from "./components/MainLayout";
import MyFooter from "./components/Footer";
import ListArticles from "./components/ListArticles";
import AddArticle from "./components/AddArticle";
import EditArticle from "./components/EditArticle";
import ViewArticle from "./components/ViewArticle";
import NoMatch from "./components/NoMatch";



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MainLayout>
          <NavigationBar />
          <Router>
            <Switch>
              <Route path="/" exact component={ListArticles} />
              <Route path="/create" component={AddArticle} />
              <Route path="/edit/:id" component={EditArticle} />
              <Route path="/view/:id" component={ViewArticle} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
          <MyFooter />
        </MainLayout>  
      </React.Fragment>
    );
  }
}

export default App;