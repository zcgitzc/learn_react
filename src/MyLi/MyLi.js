import React, { Component } from 'react';


class MyLi extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }

    componentWillReceiveProps(nextProps) {
        const me = this;
        console.log("Myli componentWillReceiveProps");
        console.log("nextProps:", nextProps);
        console.log("props:", me.props);
    }
    render() {
        const me = this;
        console.log("Myli render");
        return (
            <React.Fragment>
                <li id={me.props.value}>{me.props.value}</li>
            </React.Fragment>
        );
    }
}

export default MyLi;
