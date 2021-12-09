import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './Routes/Home/Home';
import getData from '../Component/Api/GetGraph';

class MainComponent extends Component {
    
    render() {

        return (
            <>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Redirect to="/home" />
                </Switch>
            </>
        );
    }
}

export default MainComponent;