import React from "react";
import { Table, Button, Container, Row, Col } from 'reactstrap';
import CommentIndex from './comments/CommentIndex';
import PostEdit from "./PostEdit";
import './PostView.css'

class PostView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // showPostEdit: false,
            currentPostData: this.props.postData,
            modalIsOpen: false
        }
    }

    postUpdate = (event, post, postId) => {
        console.log(postId)
        fetch(`http://localhost:3060/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ post }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ updatePressed: false, currentPostData: post })
                console.log(this.state.currentPostData)
                this.props.fetchPosts()
            })
            .then(() => this.toggleModal())
            .catch(err => console.log(err))
    }

    viewPostEdit = (e, post) => {
        (this.state.modalIsOpen) ? //! was showPostEdit
            this.setState({ currentPostData: post, modalIsOpen: false }) :
            this.setState({ currentPostData: post, modalIsOpen: true })
    }

    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: this.state.modalIsOpen })
    }

    componentDidUpdate() {
        this.props.fetchPosts()
    }

    render() {
        return (
                <Container id="curPost">
                {
                    (this.props.token.includes('Bearer')) ?
                         (JSON.parse(window.atob(this.props.token.split('.')[1])).isAdmin === true) || (JSON.parse(window.atob(this.props.token.split('.')[1])).id === this.state.currentPostData.userId) ?
                         <Row> 
                         < Col>
                         </Col> 
                         <Col id="btnCol">
                             <Button className="delBtn" style={{backgroundColor: '#6B00EA', fontWeight: 'bold', color: 'rgb(255, 238, 3)', border: 'solid', borderColor:'rgb(255, 238, 3)'}} id={this.props.postData.id} onClick={this.props.delete} color="danger">Delete!</Button>
                             <Button className="upBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: '#6B00EA', border: 'solid', borderColor:'#6B00EA'}} id={this.props.postData.id} onClick={e => this.viewPostEdit(e, this.state.currentPostData)} color="warning">Update</Button>
                         </Col>
                         <Col id="btnCol2">
                             <Button className="bBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: 'rgb(36, 36, 36)', border: 'solid', borderColor:'#6B00EA', fontSize: '1.5em'}} id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
                         </Col> 
                     </Row> 

                             : <Row>
                                 <Col>
                                     <Button className="bBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: 'rgb(36, 36, 36)', border: 'solid', borderColor:'#6B00EA', fontSize: '1.5em'}} id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
                                 </Col>
                             </Row>
                         : <Row>
                             <Col>
                                 <Button className="bBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: 'rgb(36, 36, 36)', border: 'solid', borderColor:'#6B00EA', fontSize: '1.5em'}} id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
                             </Col>
                         </Row>
                 }

                 <Row>
                     <Col>
                         <h2 id="curTitle">{this.state.currentPostData.title}</h2>
                     </Col>
                 </Row>
                 <Row>
                     <Col id="mmy">
                         <p>
                             {this.state.currentPostData.year} {this.state.currentPostData.make} {this.state.currentPostData.model}
                         </p>
                     </Col>
                 </Row>
                 <Row>
                     <Col id="user">
                         <p>Posted by: {this.props.postData.username}</p>
                     </Col>
                 </Row>
                 <Row>
                    <Col id="pBody">
                         <p>{this.state.currentPostData.content}</p>
                     </Col>
                </Row>
                {
                (this.state.modalIsOpen) ? <PostEdit
                postUpdate={this.postUpdate}
                 post={this.props.post}
                 postId={this.props.postData.id}
                 token={this.props.token}
                 fetchPosts={this.props.fetchPosts}
                 veiwPostEdit={this.veiwPostEdit}
                // showPostEdit={this.state.showPostEdit}
                toggleModal={this.toggleModal}
                modalIsOpen={this.state.modalIsOpen}
                 /> : null
                }
                 <CommentIndex
                    postData={this.props.postData}
                    postId={this.props.postData.id}
                     token={this.props.token} />
             </Container> 
        ); 
    }
}
export default PostView;

// {/* <div>
// {/* {this.props.postData.id} */}
// <h2>{this.state.currentPostData.title}</h2>
// <Table striped>
//     <thead>
//         <tr>
//             <th>Username</th>
//             {/* <th>Title</th> */}
//             <th>Year</th>
//             <th>Make</th>
//             <th>Model</th>
//             <th>Contnet</th>
//             {/* <th>Comments</th> */}
//             {/* <th></th> */}
//         </tr>
//     </thead>
//     <tbody>

//         <tr key={this.state.currentPostData.postData}>
//             <th scope="row">{this.props.postData.username}</th>
//             {/* <th>{this.state.currentPostData.title}</th> */}
//             <td>{this.state.currentPostData.year}</td>
//             <td>{this.state.currentPostData.make}</td>
//             <td>{this.state.currentPostData.model}</td>
//             <td>{this.state.currentPostData.content}</td>
//             {/* <td>{this.state.currentPostData.comments}</td> */}
//             {/* <td>
//                 <Button id={this.props.postData.id} onClick={this.props.delete} color="danger">Delete</Button>
//                 <Button id={this.props.postData.id} onClick={(e) => this.veiwPostEdit(e, this.props.postData)} color="warning">Update</Button>
//                 <Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
//             </td> */}
//             {
//                 (this.props.token.includes('Bearer')) ?
//                     (JSON.parse(window.atob(this.props.token.split('.')[1])).isAdmin === true) || (JSON.parse(window.atob(this.props.token.split('.')[1])).id === this.state.currentPostData.userId) ?
//                         <td>
//                             <Button id={this.props.postData.id} onClick={this.props.delete && this.props.handleClick} color="danger">Delete</Button>
//                             <Button id={this.props.postData.id} onClick={(e) => this.viewPostEdit(e, this.props.postData)} color="warning">Update</Button>
//                             <Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
//                         </td>
//                         : <td><Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button></td>
//                     : <td><Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button></td>
//             }
//             {/* {
//                 (this.props.token.includes('Bearer')) ?
//                     (JSON.parse(window.atob(this.props.token.split('.')[1])).id === this.state.currentPostData.userId) ?
//                         <td>
//                             <Button id={this.state.currentPostData.id} onClick={this.props.delete} color="danger">Delete</Button>
//                             <Button id={this.state.currentPostData.id} onClick={e => this.props.viewpostEdit(e, this.state.currentPostData)} color="warning">Update</Button>
//                             <Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
//                         </td>
//                         : <td><Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button></td>
//                     : <td><Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button></td>
//             } */}

//         </tr>

//     </tbody>
// </Table>
// {
//     (this.state.modalIsOpen) ? <PostEdit
//         postUpdate={this.postUpdate}
//         post={this.props.post}
//         postId={this.props.postData.id}
//         token={this.props.token}
//         fetchPosts={this.props.fetchPosts}
//         veiwPostEdit={this.veiwPostEdit}
//         // showPostEdit={this.state.showPostEdit}
//         toggleModal={this.toggleModal}
//         modalIsOpen={this.state.modalIsOpen}
//     /> : null
// }
// <CommentIndex
//     postData={this.props.postData}
//     postId={this.props.postData.id}
//     token={this.props.token} />
// </div>
// ); */}

/* <Container id="curPost">
                {/* <Row> */
/* <Col>
                        </Col>
                        <Col id="btnCol">
                            <Button className="delBtn" style={{backgroundColor: '#6B00EA', fontWeight: 'bold', color: 'rgb(255, 238, 3)', border: 'solid', borderColor:'rgb(255, 238, 3)'}} id={this.props.postData.id} onClick={this.props.delete} color="danger">Delete!</Button>
                            <Button className="upBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: '#6B00EA', border: 'solid', borderColor:'#6B00EA'}} id={this.props.postData.id} onClick={(e) => this.veiwPostEdit(e, this.props.postData)} color="warning">Update</Button>
                        </Col>
                        <Col id="btnCol2">
                            <Button className="bBtn" style={{backgroundColor: 'rgb(255, 238, 3)', fontWeight: 'bold', color: 'rgb(36, 36, 36)', border: 'solid', borderColor:'#6B00EA', fontSize: '1.5em'}} id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
                        </Col> */
/* </Row> */ 

            //         (this.props.token.includes('Bearer')) ?
            //             (JSON.parse(window.atob(this.props.token.split('.')[1])).isAdmin === true) || (JSON.parse(window.atob(this.props.token.split('.')[1])).id === this.state.currentPostData.userId) ?
            //                 <Row>
            //                     <Col>
            //                     </Col>
            //                     <Col>
            //                         <Button id={this.props.postData.id} onClick={this.props.delete && this.props.handleClick} color="danger">Delete</Button>
            //                         <Button id={this.props.postData.id} onClick={(e) => this.viewPostEdit(e, this.props.postData)} color="warning">Update</Button>
            //                     </Col>
            //                     <Col>
            //                         <Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
            //                     </Col>
            //                 </Row>

            //                 : <Row>
            //                     <Col>
            //                         <Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
            //                     </Col>
            //                 </Row>
            //             : <Row>
            //                 <Col>
            //                     <Button id={this.props.postData.id} onClick={this.props.handleClick}>Go Back</Button>
            //                 </Col>
            //             </Row>
            //     }

            //     <Row>
            //         <Col id="curTitle">
            //             <h2>{this.state.currentPostData.title}</h2>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col id="mmy">
            //             <p>
            //                 {this.state.currentPostData.year} {this.state.currentPostData.make} {this.state.currentPostData.model}
            //             </p>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col id="user">
            //             <p>Posted by: {this.props.postData.username}</p>
            //         </Col>
            //     </Row>
            //     <Row>
            //         <Col id="pBody">
            //             <p>{this.state.currentPostData.content}</p>
            //         </Col>
            //     </Row>
            // </Container> 