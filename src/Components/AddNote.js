import React, { Component } from 'react';
import ValidateError from './ValidateError';
import NotefulContext from '../NotefulContext';

function addNote(newNote, callback, props) {
  fetch(`http://localhost:9090/notes/`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
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
      props.history.push('/');
    })
    .catch((error) => {
      console.error(error);
    });
}

export default class AddNote extends Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false,
      },
      content: {
        value: '',
        touched: false,
      },
      folder: {
        value: '',
        touched: false,
      },
    };
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updateContent(content) {
    this.setState({
      content: { value: content, touched: true },
    });
  }

  updateFolder(folder) {
    this.setState({
      folder: { value: folder, touched: true },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, content, folder } = this.state;
    const newNote = {
      name: name.value,
      content: content.value,
      folderId: folder.value,
      modified: new Date(),
    };
    addNote(newNote, this.context.addNote, this.props);
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  validateFolder() {
    const folder = this.state.folder.value.trim();
    if (folder.length === 0) {
      return 'Must specify an existing folder';
    }
  }


  render() {
    const { folders } = this.context;

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
        <div className="form-group">
          <label htmlFor="Content">Note Content *</label>
          <input
            type="textarea"
            className="registration__control"
            name="Content"
            id="Content"
            onChange={(e) => this.updateContent(e.target.value)}
          />
          <div className="Add-Hint">Cannot be left blank</div>
        </div>
        <div className="form-group">
          <label htmlFor="Folders">Select a folder*</label>
          <select
            className="Add__control"
            name="Folders"
            id="Folders"
            onChange={(e) => this.updateFolder(e.target.value)}
          >
            <option value={''}>...</option>
            {folders.map((folder, index) => {
              // return <option value={folder.id} selected={index===0 `${folder.name}`}>{folder.name}</option>
              return <option value={folder.id} key={index}>{folder.name}</option>;
            })}
          </select>
          {this.state.folder.touched && (
            <ValidateError message={this.validateFolder()} />
          )}
        </div>

        <div className="Add-form button group">
          <button type="reset" className="AddForm__button">
            Cancel
          </button>
          <button
            type="submit"
            className="AddForm__button"
            disabled={this.validateName() || this.validateFolder()}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
