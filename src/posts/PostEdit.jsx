import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import APIURL from '../helpers/environment';

class PostEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // id: '',
            title: '',
            year: '',
            make: '',
            model: '',
            content: '',
        };
    }

    componentDidMount() {
        this.setState({
            // id: this.props.post.id,
            title: this.props.post.title,
            year: this.props.post.year,
            make: this.props.post.make,
            model: this.props.post.model,
            content: this.props.post.content
        })
    }

    postUpdate = (event, post, postId) => {
        console.log(postId)
        fetch(`${APIURL}/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ post }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ updatePressed: false })
                this.props.fetchPosts()
            })
            .then(() => this.props.toggleModal())
            .catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event, post) => {
        event.preventDefault();
        this.props.postUpdate(event, this.state, this.props.postId)
    }

    render() {
        return (
            <div id='modal'>
                <Modal isOpen={this.props.modalIsOpen} >
                    <ModalHeader >Edit Your Post</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.handleSubmit(e)} >
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" type="text" name="title" value={this.state.title} placeholder="enter title" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="year">Year</Label>
                                <Input type="year" name="year" id="year" value={this.state.year} onChange={this.handleChange} placeholder="year" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="make">Make</Label>
                                <Input id="make" type="text" name="make" value={this.state.make} placeholder="enter make" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="model">Model</Label>
                                <Input id="model" type="text" name="model" value={this.state.model} placeholder="enter model" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Steps</Label>
                                <Input id="content" type="text" name="content" value={this.state.content} placeholder="enter steps" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary"> Submit </Button>
                            <Button onClick={this.props.toggleModal}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default PostEdit;