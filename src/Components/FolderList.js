import React from 'react';
import FolderItem from './FolderItem';
import NotefulContext from '../NotefulContext';
import { Link } from 'react-router-dom';

export default function FolderList() {
  return (
    <NotefulContext.Consumer>
      {({ folders }) => (
        <>
          <li className="sidebar__folder-list">
            {{folders}.map(({folder}) => (
              <FolderItem folder={folder} key={folder.id} />
            ))}
          </li>
          <Link to="/add-folder">
            <button className="add-button">Add Folder</button>
          </Link>
        </>
      )}
    </NotefulContext.Consumer>
  );
}
