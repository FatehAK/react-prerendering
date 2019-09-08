import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

//grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
//allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
//create Redux store with initial state
const store = createStore(rootReducer, preloadedState || {}, applyMiddleware(thunk));
//tell react-snap how to save Redux state
window.snapSaveState = () => ({
    __PRELOADED_STATE__: store.getState()
});

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        rootElement);
} else {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        rootElement);
}

serviceWorker.unregister();
