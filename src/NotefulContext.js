import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addNote: () => {}
});

export default NotefulContext;
