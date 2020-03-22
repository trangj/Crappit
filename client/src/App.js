import React from "react";
import NavigationBar from "./components/NavigationBar";
import AlertStatus from "./components/AlertStatus";
import Home from "./components/Pages/Home";
import Post from "./components/Pages/Post";
import Topic from "./components/Pages/Topic";
import AllTopics from "./components/Pages/AllTopics";
import Container from "@material-ui/core/Container";
import NotFound from "./components/Pages/NotFound";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <NavigationBar />
        <AlertStatus />
        <Container style={{ marginTop: "2rem" }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/t" exact component={AllTopics} />
            <Route path="/t/:topic" exact component={Topic} />
            <Route path="/t/:topic/p/:id" exact component={Post} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
