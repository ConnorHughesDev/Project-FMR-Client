import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Signup.css'
import APIURL from "../helpers/environment";

// type acceptedProps = {
//     setToken: () => void
// }

// type componentState = {
//     email: string,
//     username: string,
//     password: string
// }

// class Signup extends Component<acceptedProps, componentState>

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            // isAdmin: true 
        };
    }

    handleChange = (event) => {
        // this.setState(prevState => ({...prevState, [event.target.name]: event.target.value}))
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        fetch(`${APIURL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
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
                <h1 className="signuph1">Sign Up</h1>
                <Form className="signup" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email: </Label>
                        <Input id="email" type="text" name="email" placeholder="enter email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Username: </Label>
                        <Input id="" type="text" name="username" placeholder="enter username" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password: </Label>
                        <Input id="su_password" type="password" name="password" placeholder="enter password" onChange={this.handleChange} />
                    </FormGroup>
                    <Button className="signBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: '#6B00EA', border: 'solid', borderColor:'#6B00EA'}} type="submit"> Submit </Button>
                </Form>
            </div>
        )
    }
}
export default Signup;
