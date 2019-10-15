import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReactGA from 'react-ga';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
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

ReactGA.initialize('UA-149919540-1');

const history = createBrowserHistory();
history.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,
        rootElement
    );
} else {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,
        rootElement
    );
}

serviceWorker.unregister();
