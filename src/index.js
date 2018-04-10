import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import About from './About/About';
import NoMatch from './NoMatch/NoMatch';

import registerServiceWorker from './registerServiceWorker';

import { Button, Collapse, Tag, Notification } from 'element-react';
import 'element-theme-default';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

class Index extends Component {
    render() {
        return (
            <div>
                <h1>Index</h1>
                <ul>
                    <li><Link to="/">App</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/noMatch">NoMatch</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Index>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
                <Route path="/noMatch" component={NoMatch} />
            </Switch>
        </Index>
    </BrowserRouter>,
    document.getElementById('root')
);


registerServiceWorker();
