import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NoteItem from './NoteItem';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';



class NoteList extends Component {
  static contextType = NotefulContext;

  render() {
    let { notes } = this.context;
    const { match, location } = this.props;

    notes =
      location.pathname.length !== 1
        ? notes.filter((note) => note.folderId === match.params.folderId)
        : notes;

    return (
      <>
        <li className='main__note-list'>
          {notes.map((note) => (
            <NoteItem note={note} key={note.id} />
          ))}
        </li>
        <Link to = "/add-note">
        < button className="add-button">
              Add Note
        </button>
      </Link>
    </>
    );
  }
}

export default withRouter(NoteList);
