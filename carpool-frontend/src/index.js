import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BroswerRouter } from 'react-router-dom';


ReactDOM.render(
    <BroswerRouter><App /></BroswerRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
