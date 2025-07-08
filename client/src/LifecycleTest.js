import React, { Component } from "react";

class LifecycleTest extends Component {
    constructor(props){
        super(props);
        this.state = {};
        console.log('1,constructor Call');
    }
    
    render(){   
        console.log('3.render Call')
        return(
        <h2>
            THis is render function
        </h2>
        );
    }
}

export default LifecycleTest;
