import React from 'react';
import FolderItem from './FolderItem';
import NotefulContext from '../NotefulContext';

export default function FolderList() {
  return (
    <NotefulContext.Consumer>
      {({ folders }) => (
        <li className='sidebar__folder-list'>
          {folders.map((folder) => (
            <FolderItem folder={folder} key={folder.id} />
          ))}
        </li>
      )}
    </NotefulContext.Consumer>
  );
}
