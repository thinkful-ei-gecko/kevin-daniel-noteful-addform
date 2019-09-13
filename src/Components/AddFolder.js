import React, { Component } from 'react';
import ValidateError from './ValidateError';
import NotefulContext from '../NotefulContext';

function addFolder(newFolder, callback, props) {
  fetch(`http://localhost:9090/folders/`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFolder),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
      return res.json();
    })
    .then((data) => {
      callback(data);
      props.history.push(`/folder/${data.id}`);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default class AddFolder extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false,
      },
    };
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    const newFolder = {
      name: name.value,
    };
    addFolder(newFolder, this.context.addFolder, this.props);
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  render() {
    return (
      <form className="Add-Form" onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Add a Note</h2>
        <div className="Add-Hint">* required field</div>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            className="Add-Control"
            name="name"
            id="name"
            onChange={(e) => this.updateName(e.target.value)}
          />
          {this.state.name.touched && (
            <ValidateError message={this.validateName()} />
          )}
        </div>

        <div className="Add-form button group">
          <button type="reset" className="AddForm__button">
            Cancel
          </button>
          <button
            type="submit"
            className="AddForm__button"
            disabled={this.validateName()}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
