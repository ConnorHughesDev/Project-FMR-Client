import { Component } from 'react';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommentCreate from './CommentCreate';
import CommentsTable from './CommentsTable';
import CommentEdit from './CommentEdit';
// import PostsTable from './PostsTable';
// import PostEdit from './PostEdit';
import './CommentIndex.css'
import APIURL from '../../helpers/enviornment';


class CommentIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            updatePressed: false,
            commentToUpdate: {},
            showComment: false,
            currentCommentData: {},
            modalIsOpen: false
        }
    }

    fetchComments = () => {
        fetch(`${APIURL}/comments/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
            .then((res) => res.json())
            .then((commentData) => {
                return this.setState({ comments: commentData })
            })
    }

    commentUpdate = (event, comment) => {
        // console.log(comment.content)
        fetch(`${APIURL}/comments/${comment.id}`, {
            method: 'PUT',
            body: JSON.stringify({ "comment": {'content': comment.content} }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .then((data) => {
                this.setState({ updatePressed: false, currentCommentData: comment })
                console.log(this.state.currentCommentData)
                this.fetchComments();
            })
            .then(() => this.toggleModal())
            .catch(err => console.log(err))
    }

    commentDelete = (event) => {
        fetch(`${APIURL}/comments/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ post: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => this.fetchComments())
    }

    viewCommentEdit = (e, comment) => {
            (this.state.modalIsOpen) ?
            this.setState({ currentCommentData: comment, modalIsOpen: false }) :
            this.setState({ currentCommentData: comment, modalIsOpen: true })
    }

    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: this.state.modalIsOpen })
    }

    setUpdatedComment = (event, comment) => {
        this.setState({
            commentToUpdate: comment,
            updatePressed: true
        })
    }

    componentDidMount() {
        this.fetchComments()
    }

    // handleClick = (e, comment) => {
    //     (this.state.showComment) ?
    //         this.setState({ showComment: false, currentCommentData: comment }) :
    //         this.setState({ showComment: true, currentCommentData: comment })
    // }

    render() {
        // if (!this.state.showComment) {
        //     const comments = this.state.comments.length >=1 ?
        //     <CommentsTable handleClick={this.handleClick}
        //     comments={this.state.comments} 
        //         delete={this.commentDelete} 
        //         token={this.props.token} 
        //         update={this.setUpdatedComment} 
        //         /> :
        //         <h2>Make a comment to see table</h2>

        //         return (
        //             <Container>
        //                 <Row>
        //                     <Col md="3">
        //                         <CommentCreate
        //                         token={this.props.token}
        //                         updateCommentsArray={this.fetchComments}
        //                         />
        //                     </Col>
        //                     <Col md="9">
        //                         {comments}
        //                     </Col>
        //                 </Row>
        //             </Container>
        //         )
        // } else {
        //     return(
        //         <CommentView 
        //         handleClick={this.handleClick} 
        //         commentData={this.state.currentCommentData} 
        //         delete={this.commentDelete} 
        //         token={this.props.token} 
        //         update={this.setUpdatedComment} 
        //         update2={this.commentUpdate} 
        //         comment={this.state.commentToUpdate} 
        //         fetchCommentss={this.fetchComments} 
        //         />
        //     )
        // }
        const comments = this.state.comments.length >= 1 ?
            <CommentsTable
                currentCommentData={this.state.currentCommentData}
                postId={this.props.postId}
                viewCommentEdit={this.viewCommentEdit}
                handleClick={this.handleClick}
                comments={this.state.comments}
                delete={this.commentDelete}
                token={this.props.token}
                update={this.setUpdatedComment} /> :
            <h2>Make a comment to see table</h2>

        return (
            <Container>
                <Row>
                    <Col md="3">
                        <CommentCreate
                            id={this.props.postData.id}
                            token={this.props.token}
                            updateCommentsArray={this.fetchComments} />
                    </Col>
                    <Col md="9">
                        {comments}
                    </Col>
                </Row>
                {/* {CommentEdit} */}
                <Col md='12'>
                    {
                        (this.state.modalIsOpen) ? <CommentEdit
                            setUpdatedComment={this.setUpdatedComment}
                            commentUpdate={this.commentUpdate}
                            comment={this.props.comment}
                            currentCommentData={this.state.currentCommentData}
                            commentId={this.state.currentCommentData.id}
                            token={this.props.token}
                            fetchComments={this.fetchComments}
                            veiwCommentEdit={this.veiwCommentEdit}
                            toggleModal={this.toggleModal}
                            modalIsOpen={this.state.modalIsOpen}
                            closeModal={this.state.modalIsOpen}
                        /> : null
                    }
                </Col>
            </Container>
        )
    }
}

export default CommentIndex

{/* {
                    this.state.updatePressed ? 
                    <CommentEdit 
                    target={this.state.updatePressed} 
                    update={this.commentUpdate} 
                    comment={this.state.commentToUpdate} /> :
                    <div></div>
                    } */}