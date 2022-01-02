import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import Home from "./routes/Home";
import TableDetails from './routes/TableDetails';


const App = () => {
  return (
    <UserProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tableA/:id" component={TableDetails}/>
          </Switch>
        </Router>
      </div>
    </UserProvider>
      
  );
};

export default App

