import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import "./App.css";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm"
const App = () => {

  return (
    <div className="app">
      <div className="menu">
        <h4 className="app-title">Address Book</h4>
      </div>
      

      <div className="address-content">
        <Router>
          <Switch>
          <Route exact path="/" component={ContactList} />
          <Route exact path="/add" component={ContactForm} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
