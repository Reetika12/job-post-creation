import React, { Component } from 'react';

class AsyncAWait extends Component{

    async returnPromise(){
        console.log("inside promise")
        let response = await fetch('https://api.github.com/users')
        console.log("before response")
        const users = await response.json();
        console.log('users resolved')
        return users;
    }

    render(){
        return(
            <div>
                hello guys
                <div>first statment</div>
                 {this.returnPromise}
                 <div>after promise statment</div>
            </div>
        )
    }
}

export default AsyncAWait