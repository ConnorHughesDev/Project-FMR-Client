import React from 'react';
import { Table, Button, Col, Row, Container } from 'reactstrap';
import CommentIndex from './comments/CommentIndex';
import './PostTable.css'

class PostsTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = ""
    }

    render() {
    return (
            <Container id='top' responsive>
                <Col xs={{ offset: '5', size: 'auto' }}>
                    <h3 id="header">Posts</h3>
                </Col>
                <hr />
                <Col md={{ offset: 'auto', size: 'auto' }}>
                        <Table xs={{ offset: 'auto', size: 'auto' }} size='sm' responsive striped>
                            <thead id="head">
                                <tr id='trow'>
                                    <th>Username</th>
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    {/* <th>Contnet</th> */}
                                    {/* <th>Comments</th> */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.posts.map((post, id) => {
                                        return (
                                            <tr id='mtrow' key={id}>
                                                <th scope="row">{post.username}</th>
                                                <td id='title'>{post.title}</td>
                                                <td>{post.year}</td>
                                                <td>{post.make}</td>
                                                <td>{post.model}</td>
                                                {/* <td>{post.content}</td> */}
                                                {/* <td>{post.comments}</td> */}
                                                <td>
                                                    {/* <Button id={post.id} onClick={this.props.delete} color="danger">Delete</Button> */}
                                                    {/* <Button id={post.id} onClick={e => this.props.update(e, post)} color="warning">Update</Button> */}
                                                    <Button id={post.id} style={{backgroundColor: '#6B00EA', fontWeight: 'bold', color: 'rgb(255, 238, 3)', border: 'solid', borderColor:'rgb(255, 238, 3)'}} className='viewbtn' onClick={e => this.props.handleClick(e, post)} color="secondary">View</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                </Col>
                {/* <CommentIndex postData={this.state.currentPostData} token={this.props.token} /> */}
            </Container>
    );

}
}
export default PostsTable;
