import React from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../Home/Home';
import Contact from '../Contact/Contact';
import About from '../About/About';
import Nav from '../Nav/Nav';
import './App.css';

ReactGA.initialize('UA-149919540-1');

const history = createBrowserHistory();
history.listen((location) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});

class App extends React.Component {
    componentDidMount() {
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div className="app">
                <BrowserRouter history={history}>
                    <Nav />
                    <Route exact path="/" render={() => (
                        <Home text="Home (from props)" />
                    )} />
                    <Route path="/contact" render={() => (
                        <Contact text="Contact us (from props)" />
                    )} />
                    <Route path="/about" render={() => (
                        <About text="About us (from props)" />
                    )} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
