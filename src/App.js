import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');
const Fuse = require('fuse.js');
var $ = require("jquery");


//https://gist.githubusercontent.com/anonymous/1295788c7bff052a1e8a/raw/6e109604c7a7f3efe77c8048bb2fe2f3e1cdcb7b/gistfile1.json

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentWillMount() {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    fetch(endpoint)
    .then(blob => blob.json())
      .then(data => this.setState({items: (data)}));
  }

  render() {
    console.log('I was triggered during render'); //ACA SOLO RENDERIZO EL INPUT
    return (
      <div>
        <Input items={this.state.items}/>
      </div>
    )
  }
}

class Input extends Component {
  constructor(props) {

    super(props);

    this.state = {
      input: '',
      items: []
    };
    // this.makeSearch = this.makeSearch.bind(this);
    // this.handleChange = this.handleChange.bind(this);

  }


  handleChange(e) {
    this.setState({input : e.target.value}, this.makeSearch);
    //llamar a makeSearch aca con input

  }


  makeSearch = () => {
    var options = {
      threshold: 0.1,
      location: 1,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["city"]
    };
    var fuse = new Fuse(this.props.items, options);
    var result = fuse.search(this.state.input);
    this.setState({items: result});
  }


  render() {
    return (
      <div className='container'>
        <h1 className='title'>React search app</h1>


        <h3>Search for US cities</h3>
        <input type="text" name="search" className=''
          value={this.state.input}
          onChange={this.handleChange.bind(this)}
        />

        <ul className='container'>
           {this.state.items.map(item => <li>{item.city}</li>)}
           </ul>

      </div>
    )

  }
}

// App -> Input

export default App;
