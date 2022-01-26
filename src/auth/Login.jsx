import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isValid: false,
            message: '',
            usernameRegex: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        console.log(this.state)
        fetch("http://localhost:3060/auth/login", {
            method: 'POST',
            body: JSON.stringify({ user: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
        })
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1 className="loginh1">Login</h1>
                <Form className="login" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="li_username" type="text" name="username" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="li_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button className="logBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: '#6B00EA', border: 'solid', borderColor:'#6B00EA'}} type="submit"> Submit </Button>
                </Form>
            </div>
        )
    }
}
export default Login;