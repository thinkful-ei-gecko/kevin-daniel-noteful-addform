import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import Moment from 'react-moment'

function deleteNoteRequest(noteId, callback) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
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
      callback(noteId);
    })
    .catch((error) => {
      console.error(error);
    });
}

export default class NoteItem extends Component {
  static contextType = NotefulContext;

  render() {
    const { id, name, modified } = this.props.note;


    return (
      <div className='main__note-item' key={id}>
        <Link to={`/note/${id}`}>
          <p>{name}</p>
        </Link>
        <p><Moment format="YYYY/MM/DD">
                {modified}
            </Moment></p>
        <button
          type='button'
          onClick={() => deleteNoteRequest(id, this.context.deleteNote)}
        >
          Delete note
        </button>
      </div>

    );
  }
}
