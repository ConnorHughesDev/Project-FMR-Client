import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class CommentEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.commentId,
            // title: '',
            // year: '',
            // make: '',
            // model: '',
            content: ''
        };
    }

    componentDidMount() {
        this.setState({
            // id: this.props.post.id,
            // title: this.props.post.title,
            // year: this.props.post.year,
            // make: this.props.post.make,
            // model: this.props.post.model,
            // content: this.props.comment.content ///! somehting with this
        })
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // this.props.update(event, this.state, this.props.currentCommentData.id)
        this.props.commentUpdate(event, this.state)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modalIsOpen} >
                    <ModalHeader>Edit Your Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.handleSubmit(e)} >
                            <FormGroup>
                                <Label for="comment">Comment</Label>
                                <Input id="comment" type="text" name="comment" value={this.state.comment} placeholder="enter comment" onChange={this.handleChange} />
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
export default CommentEdit;