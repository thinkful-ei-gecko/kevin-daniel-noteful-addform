import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

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

class NoteDetailedView extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes, deleteNote } = this.context;
    const { match } = this.props;
    const note = notes.find((note) => note.id.toString() === match.params.noteId);

    return (
      <div className='main__note-detailed-view' key={note.id}>
        <p>{note.name}</p>
        <p>{note.modified}</p>
        <Link to='/'>
          <button
            type='button'
            onClick={() => deleteNoteRequest(note.id, deleteNote)}
          >
            Delete note
          </button>
        </Link>
        <p>{note.content}</p>
      </div>
    );
  }
}

export default withRouter(NoteDetailedView);
