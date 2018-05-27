//core
import React, { Component } from 'react';

//components
import FileUploader from './FileUploader';

//utils
import {meyer_showMessage, meyer_visibility, classToggler} from './../scripts/meyer';


class App extends Component {
  state = {
    
  }
  
  componentDidMount = () => {
    
  }

    render() {
    return (
      <div className="app">  
        <FileUploader 
          fileMaxSize={1 * 1024 * 1024}
          uploadMaxSize={2 * 1024 * 1024}
          multipleFiles={true} 
          uploadSizeBar={true}
        />
      </div>
    );
  }
}

export default App;
