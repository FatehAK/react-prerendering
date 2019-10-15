import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga';
import './About.css';
import img from '../../img/about.jpg';

class About extends React.Component {
    state = {
        text: 'About us (from state)'
    };

    handleClick() {
        ReactGA.event({
            category: 'LINK_CLICK',
            action: 'User clicked link',
            label: 'ABOUT_PAGE'
        });
    }

    render() {
        return (
            <div className="about">
                <Helmet>
                    <title>About Page</title>
                </Helmet>
                <NavLink to="/contact" onClick={() => this.handleClick()}>Goto About</NavLink>
                <div className="about-state">{this.state.text}</div>
                <div className="about-props">{this.props.text}</div>
                <img src={img} alt="about" width="200px" height="150px" />
            </div>
        );
    }
}

export default About;
