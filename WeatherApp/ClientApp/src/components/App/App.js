import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from '../Home/Home';
import { FetchData } from '../FetchData';
import { Counter } from '../Counter';
import { Login } from '../Login/Login';
import WeatherTable from '../WeatherTable/WeatherTable';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import { Menu } from '../Menu/Menu';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography';
import history from '../../history';
import './App.css';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    fullList: {
        width: 250,
    },
    content: {
        marginTop: 500
    },
};

class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);
        // normally token would be kept in redux store
        this.state = { user: null, openDrawer: false, }
        if (this.state.user === null && history.location.pathname !== '/login')
          history.push('/login');
    }

    onSignInSuccess = (user) => {
        this.setState({ user: user });
        console.log(user);
        history.push('/');
    }

    toggleDrawer = () => {
        this.setState({ openDrawer: !this.state.openDrawer })
    }

    render() {
        const classes = this.props.classes;

        let labels = [
            { displayName: "Home", path: "/" },
            { displayName: "Archival weather data", path: "/archival" },
        ];

        const isAdmin = this.state.user && this.state.user.role === "Admin";
        if (isAdmin)
            labels.push({ displayName: "Get new data", path: "/new" });

        return (
            <div className="container">
                <div>
                    <AppBar position="fixed" className="appBar">
                        <Toolbar>
                            {history.location.pathname !== '/login' ?
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
                                    <MenuIcon />
                                </IconButton>
                                :
                                <div className="placeholder-div"></div>
                            }
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                Weather app
				      </Typography>
                        </Toolbar>
                        <Menu openMenu={this.state.openDrawer} onClose={this.toggleDrawer} labels={labels} />
                    </AppBar>
                </div>
                <div className="content">
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetchdata' component={FetchData} />
                    <Route path='/login' render={(props) => <Login {...props} onSignInSuccess={this.onSignInSuccess} />} />
                    <Route path='/archival' render={(props) => <WeatherTable {...props} user={this.state.user} />} />
                    <Route path='/new' render={(props) => <CurrentWeather {...props} user={this.state.user} />} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(App);
