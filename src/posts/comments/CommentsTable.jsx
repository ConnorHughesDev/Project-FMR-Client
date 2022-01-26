import React from 'react';
import { Table, Button } from 'reactstrap';
import CommentEdit from './CommentEdit';
import './CommentTable.css'

class CommentsTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = ""
    }

    render() {
        return (
            <div>
                <h3 id='comTitle'>Comment History</h3>
                <hr />
                <Table striped>
                    <thead>
                        <tr>
                            <th id='user'>User</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.comments.map((comment, id) => {
                                return (
                                    (comment.postId === this.props.postId) ?
                                        <tr key={id}>
                                            <th id='username' scope="row">{comment.username}</th>
                                            <td id='comment'>{comment.content}</td>
                                            {/* <td>
                                                <Button id={comment.id} onClick={this.props.delete} color="danger">Delete</Button>
                                                <Button id={comment.id} onClick={e => this.props.viewCommentEdit(e, comment)} color="warning">Update</Button>
                                            </td> */}
                                            {
                                                (this.props.token.includes('Bearer')) ?
                                                (JSON.parse(window.atob(this.props.token.split('.')[1])).isAdmin === true) || (JSON.parse(window.atob(this.props.token.split('.')[1])).id === comment.userId) ?
                                                    <td>
                                                        <Button className='delBtn' id={comment.id} style={{backgroundColor: '#6B00EA', fontWeight: 'bold', color: 'rgb(255, 238, 3)', border: 'solid', borderColor:'rgb(255, 238, 3)'}} onClick={this.props.delete} color="danger">Delete</Button>
                                                        <Button className='upBtn' id={comment.id} style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: '#6B00EA', border: 'solid', borderColor:'#6B00EA'}} onClick={e => this.props.viewCommentEdit(e, comment)} color="warning">Update</Button>
                                                    </td>
                                                    : null
                                                    : null
                                            }
                                            {/* {
                                                (this.props.token.includes('Bearer')) ?
                                                (JSON.parse(window.atob(this.props.token.split('.')[1])).id === comment.userId) ?
                                                    <td>
                                                        <Button id={comment.id} onClick={this.props.delete} color="danger">Delete</Button>
                                                        <Button id={comment.id} onClick={e => this.props.viewCommentEdit(e, comment)} color="warning">Update</Button>
                                                    </td>
                                                    : null
                                                    : null
                                            } */}
                                        </tr> : null
                                )
                            })
                        }
                    </tbody>
                </Table>
                {/* put post modal here with ternary */}
            </div>
        );
    }
}

export default CommentsTable;

