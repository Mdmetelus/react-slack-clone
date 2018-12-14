import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../src/components/App';

const Root = () => (
    <Router>
        <Switch>
            <route exact path="/" component={App}/>
            <route path="/login" component={Login}/>
            <route path="/register" component={Register}/>
        </Switch>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
