import React from 'react';
import { Helmet } from 'react-helmet';
import './Home.css';
import img from '../../img/home.jpg';

class Home extends React.Component {
    state = {
        text: 'Home (from state)'
    };

    render() {
        return (
            <div className="home">
                <Helmet>
                    <title>Home Page</title>
                </Helmet>
                <div className="home-state">{this.state.text}</div>
                <div className="home-props">{this.props.text}</div>
                <img src={img} alt="home" width="200px" height="150px" />
            </div>
        );
    }
}

export default Home;
