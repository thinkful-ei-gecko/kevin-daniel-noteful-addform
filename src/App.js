import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Sidebar from './Components/Sidebar';
import FolderList from './Components/FolderList';
import FolderDetailedView from './Components/FolderDetailedView';
import NoteList from './Components/NoteList';
import NoteDetailedView from './Components/NoteDetailedView';
import NotFound from './Components/NotFound';
import NotefulContext from './NotefulContext';

export default class App extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: [],
    };
  }

  handleDeleteNote = (noteId) => {
    const newNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({
      notes: newNotes,
    });
  };

  getFolders() {
    fetch(`http://localhost:9090/folders`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          folders: data,
        });
      })
      .catch((error) => alert(error));
  }

  getNotes() {
    fetch(`http://localhost:9090/notes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          notes: data,
        });
      })
      .catch((error) => alert(error));
  }

  componentDidMount() {
    this.getNotes();
    this.getFolders();
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
    };

    return (
      <div className='app'>
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <Sidebar>
            <Switch>
              <Route exact path='/' component={FolderList} />
              <Route path='/folder/:folderId' component={FolderList} />
              <Route path='/note/:noteId' component={FolderDetailedView} />
              <Route component={NotFound} />
            </Switch>
          </Sidebar>
          <Main>
            <Switch>
              <Route exact path='/' component={NoteList} />
              <Route path='/folder/:folderId' component={NoteList} />
              <Route path='/note/:noteId' component={NoteDetailedView} />
              <Route component={NotFound} />
            </Switch>
          </Main>
        </NotefulContext.Provider>
      </div>
    );
  }
}
