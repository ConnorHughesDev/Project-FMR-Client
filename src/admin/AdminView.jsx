import { Component } from 'react';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class AdminView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            currentUser: {}
        }
    }

    fetchUsers = () => {
        fetch("http://localhost:3060/auth/userinfo", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((userData) => {
                return this.setState({ users: userData })
            })
    }

    componentDidMount() {
        this.fetchUsers()
    }
}

export default AdminView