import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './CommentCreate.css'

class CommentCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            content: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3060/comments/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment: { postId: this.props.id, content: this.state.content } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((CommentData) => {
                this.props.updateCommentsArray();
                this.setState({
                    id: '',
                    content: ''
                })
            })
    }


    render() {
        if (this.props.token === localStorage.getItem('token')) {
            return (
                <div>
                    <h3 id='comHere'>Comment Here</h3>
                    <hr />
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            {/* <Label for="Content">Comment</Label> */}
                            <Input id="content" type="text" name="content" value={this.state.content} placeholder="enter comment" onChange={this.handleChange} />
                        </FormGroup>
                        <Button className='bBtn' style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: 'rgb(36, 36, 36)', border: 'solid', borderColor:'#6B00EA', fontSize: '1em'}} type="submit" color="primary"> Submit </Button>
                    </Form>
                </div>
            )
        } else {
            return(
                <h3 id='signCom'>Sign in to comment</h3>
            )
        }
    }
}

export default CommentCreate