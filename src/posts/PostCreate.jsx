import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import './PosteCreate.css'
import APIURL from '../helpers/environment';

class PostCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            year: '',
            make: '',
            model: '',
            content: ''
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/posts/post`, {
            method: 'POST',
            body: JSON.stringify({ post: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((postData) => {
                this.props.updatePostsArray();
                this.setState({
                    id: '',
                    title: '',
                    year: '',
                    make: '',
                    model: '',
                    content: ''
                })
            })
    }


    render() {
        if (this.props.token === localStorage.getItem('token')) {
            return (
                <Container id='div'>
                    <h3 className='posth3'>Create a Post</h3>
                    <hr />
                    <Form className='form' onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Label className='label' for="title">Title</Label>
                            <Input id="title" type="text" name="title" value={this.state.title} placeholder="enter title" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label className='label' for="year">Year</Label>
                            <Input type="year" name="year" id="year" value={this.state.year} onChange={this.handleChange} placeholder="year" />
                        </FormGroup>
                        <FormGroup>
                            <Label className='label' for="make">Make</Label>
                            <Input id="make" type="text" name="make" value={this.state.make} placeholder="enter make" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label className='label' for="model">Model</Label>
                            <Input id="model" type="text" name="model" value={this.state.model} placeholder="enter model" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label className='label' for="content">Steps</Label>
                            <Input id="content" type="text" name="content" value={this.state.content} placeholder="enter steps" onChange={this.handleChange} />
                        </FormGroup>
                        <Button className='subbtn' style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: '#6B00EA', border: 'solid', borderColor:'#6B00EA'}} type="submit" color="secondary"> Submit </Button>
                    </Form>
                </Container>
            )
        } else {
            return (
                <Container className='signIn'>
                    <h3>Sign in to create a post</h3>
                </Container>
            )
        }
    }
}

export default PostCreate