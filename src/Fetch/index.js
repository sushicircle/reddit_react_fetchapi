import React, { Component } from 'react';

var API = 'https://www.reddit.com/r/todayilearned/top.json?limit=2';

class Fetch extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            jsondata: [],
         // error: null,
        };
      }

    componentDidMount() {    
        fetch(API)
        .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong ...');
            }
          })
          .then(res => this.setState({ jsondata: res.data.children}))
         // .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
        const { jsondata } = this.state;

    return (
        <ul>
          {jsondata.map(info =>
          <li key={info.data.created}>
             <p> {info.data.title}</p>
          </li>
          )}
        </ul>
      );
    }

}

export default Fetch;