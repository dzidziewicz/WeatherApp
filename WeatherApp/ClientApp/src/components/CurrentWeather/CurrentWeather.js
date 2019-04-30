import React, { Component } from 'react';
import { TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './CurrentWeather.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        "marginRight": '15px'
    },
});

class CurrentWeather extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "", country: "", data: null, error: false };

    }

    onCityChange = (event) => {
        this.setState({ city: event.target.value });
    }

    onCountryChange = (event) => {
        this.setState({ country: event.target.value });
    }

    getWeather = () => {
        if (this.state.city === "") {
            this.setState({ error: true });
            return;
        }

        const param = this.state.city + (this.state.country ? ("," + this.state.country) : "");

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appId=f7571e93aee12a2071b29e2368d3cf39&units=metric`)
            .then(result => {
                console.log(result);
                const data = result.data;
                const rain = data.rain ? data.rain["1h"] : null;
                this.setState({
                    data: {
                        temp: data.main.temp,
                        pressure: data.main.pressure,
                        rainVolume: rain,
                        windSpeed: data.wind.speed,
                        cityName: data.name,
                        cityCountryCode: data.sys.country
                    }
                });
            })
            .catch(error => {
                console.log('Error while fetching current weather', error);
            });
    }

    upload = () => {
        axios.post('/weather', this.state.data, {
            headers: {
                Authorization: "Bearer " + this.props.user.token
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log('Error while uploading to database', error);
            });
    }

    displayWeather = () => {
        if (this.state.data === null) return null;
        const classes = this.props.classes;

        return (
            <div className="upload">
                <div className="table" >
                    <div className="row">
                        <Typography variant="h6">Temperature  <i className="fas fa-temperature-high"></i>  {this.state.data.temp} deg. C</Typography>
                    </div>
                    <div className="row">
                        <Typography variant="h6">Pressure  <img src="./../../measure.png" height="24px" alt="" />  {this.state.data.pressure} hPa</Typography>
                    </div>
                    <div className="row">
                        <Typography variant="h6">Wind  <i className="fas fa-wind"></i>  {this.state.data.windSpeed} m/s</Typography>
                    </div>
                    <div className="row">
                        <Typography variant="h6">Rain  <i className="fas fa-cloud-rain"></i>  {this.state.data.rainVolume || 0} mm</Typography>
                    </div>
                </div>
                <div className="row upload-button-box">
                    <Button onClick={this.upload}

                        variant="contained"
                        color="primary"
                        className={"upload-button " + classes.button}>
                        Add to database
                </Button>
                </div>
            </div>
        )
    }
    render() {
        const classes = this.props.classes;

        return (
            <div className="content">
                <div className="inputs">
                    <TextField id="standard-multiline-flexiblesdfsdf"
                        label="City"
                        value={this.state.city}
                        onChange={this.onCityChange}
                        error={this.state.error}
                        margin="normal"
                        className={"textfield " + classes.input} />

                    <TextField id="standard-multiline-flexiblesdfsdf"
                        label="Country code"
                        value={this.state.country}
                        onChange={this.onCountryChange}
                        margin="normal"
                        className={"textfield " + classes.input} />

                    <Button onClick={this.getWeather}
                        variant="contained"
                        color="primary"
                        className={"button " + classes.button}>
                        Get weather!
                        </Button>
                </div>
                {this.displayWeather()}
            </div>
        );
    }
}

export default withStyles(styles)(CurrentWeather);