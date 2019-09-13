import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <Link to='/'>
          <h1>Noteful</h1>
        </Link>
      </div>
    );
  }
}
