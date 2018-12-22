import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import Router from './router/index.jsx';
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
// import registerServiceWorker from './registerServiceWorker';
import './styles/media.less'
import './styles/editor.less'
const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
ReactDOM.render( 
<Provider store={store}>
    <Router />
</Provider>, document.getElementById('root'));
// registerServiceWorker();
