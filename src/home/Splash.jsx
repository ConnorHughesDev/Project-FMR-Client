import React, { Component } from 'react';
import PostIndex from '../posts/PostIndex'
import './Splash.css'

class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = ""
    }

    render() {
        return (
            <div className='splash'>
                <PostIndex token={this.props.token} />
            </div>
        )
    }
}

export default Splash;
