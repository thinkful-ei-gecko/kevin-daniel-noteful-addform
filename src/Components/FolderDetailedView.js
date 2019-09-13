import React, { Component } from 'react';
import { withRouter } from 'react-router';
import NotefulContext from '../NotefulContext';

class FolderDetailedView extends Component {
  static contextType = NotefulContext;

  render() {
    const { folders, notes } = this.context;
    const { match, history } = this.props;

    const folder = folders.find(
      (folder) =>
        folder.id ===
        notes.find((note) => note.id.toString() === match.params.noteId).folderId
    );

    return (
      <div className='sidebar__folder-detailed-view' key={folder.id}>
        <button type='button' onClick={() => history.goBack()}>
          Go back
        </button>
        <h2>{folder.name}</h2>
      </div>
    );
  }
}

export default withRouter(FolderDetailedView);
