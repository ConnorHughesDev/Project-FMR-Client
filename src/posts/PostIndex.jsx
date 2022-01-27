import { Component } from 'react';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostCreate from './PostCreate';
import PostsTable from './PostsTable';
import PostEdit from './PostEdit';
import PostView from './PostView';
import APIURL from '../helpers/enviornment';


class PostIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            updatePressed: false,
            postToUpdate: {},
            showPost: false,
            currentPostData: {}
        }
    }

    fetchPosts = () => {
        fetch(`${APIURL}/posts/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
            .then((res) => res.json())
            .then((postData) => {
                return this.setState({ posts: postData })
            })
    }


    postDelete = (event) => {
        // console.log('potato')
        fetch(`${APIURL}/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ post: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => this.fetchPosts())
            .then(this.handleClick)
    }

    setUpdatedPost = (event, post) => {
        this.setState({
            postToUpdate: post,
            updatePressed: true
        })
    }

    componentDidMount() {
        this.fetchPosts()
    }

    handleClick = (e, post) => {
        (this.state.showPost) ? 
        this.setState({ showPost: false, currentPostData: post }) :
        this.setState({ showPost: true, currentPostData: post })
    }

    render() {
        if (!this.state.showPost) {
            const posts = this.state.posts.length >= 1 ?
                <PostsTable handleClick={this.handleClick} 
                posts={this.state.posts} 
                delete={this.postDelete} 
                token={this.props.token} 
                update={this.setUpdatedPost} 
                /> :
                <h2>Make a post to see table</h2>

            return (
                <Container>
                    <Row>
                    <Row md="9">
                            {posts}
                        </Row>
                        <Row md="3">
                            <PostCreate 
                            token={this.props.token} 
                            updatePostsArray={this.fetchPosts} 
                            />
                        </Row>
                    </Row>
                </Container>
            )
        } else {
            return(
                <PostView 
                handleClick={this.handleClick} 
                postData={this.state.currentPostData} 
                delete={this.postDelete} 
                token={this.props.token} 
                update={this.setUpdatedPost} 
                update2={this.postUpdate} 
                post={this.state.postToUpdate} 
                fetchPosts={this.fetchPosts} 
                />
            )
        }
    }
}

export default PostIndex