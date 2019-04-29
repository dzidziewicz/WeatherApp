import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import './Login.css';

export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", error: false };
    }

    signIn = () => {
        axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        })
            .then((response) => {
                this.setState({ error: false });
                this.props.onSignInSuccess(response.data);
            })
            .catch((error) => {
                this.setState({ error: true })
                console.log(error);
            });
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    render() {
        return (
            <div className="container">
                <div className="title-login" >
                    <Typography variant="h4">Sign in to Weather app</Typography>
                </div>
                <Paper className="card">
                    <div className="paper-content">
                        <div className="login-inputs">
                            {this.state.error ?
                                (
                                    <Typography className="error">Invalid username or password</Typography>
                                )
                                : ""
                            }
                            <TextField id="standard-multiline-flexiblesdfsdf"
                                label="Username"
                                value={this.state.username}
                                onChange={this.onUsernameChange}
                                margin="normal"
                            />
                            <TextField id="standard-multiline-flexiblesdfsdf"
                                label="Password"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                                margin="normal"
                            />

                        </div>
                        <div className="buttons">
                            <Button onClick={this.signIn}>Sign in</Button>
                        </div>
                    </div>
                </Paper>

            </div>
        )
    }
}