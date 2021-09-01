import React, { Component } from 'react'

export default class geolocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position)
          return position
        });
      }


    render() {
        return (
            <></>
        );
    }
}
