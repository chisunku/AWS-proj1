import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router as BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Login from './components/LogIn';
import HomePage from './components/HomePage';

const history =  createBrowserHistory();
const routing = (
    <BrowserRouter history={history}>
        <div>
            <Switch>
                <Route path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/userpage" component={HomePage} />
            </Switch>
        </div>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));