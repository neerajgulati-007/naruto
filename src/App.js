import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './ducks/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/" component ={Home} exact/>
          </Switch>
        </header>
      </div>
    </Provider>
  );
}

export default App;
