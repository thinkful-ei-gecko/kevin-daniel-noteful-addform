import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NoteItem from './NoteItem';
import NotefulContext from '../NotefulContext';

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
      <li className='main__note-list'>
        {notes.map((note) => (
          <NoteItem note={note} key={note.id} />
        ))}
      </li>
    );
  }
}

export default withRouter(NoteList);
