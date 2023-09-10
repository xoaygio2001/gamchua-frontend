import React, { Component } from "react";

class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrNewGame: []
        }
    }

    async componentDidMount() {

    }

    render() {


        return (
            <>Default</>
        )
    }
}

export default DefaultClass;