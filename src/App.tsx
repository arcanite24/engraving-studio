import React from 'react';
import { EditorPage } from './modules/editor/editor.page';
import { Provider } from 'react-redux';
import { store } from './app.store';

interface AppProps {}

function App({}: AppProps) {
  return (
    <div className="App">
      <Provider store={store}>
        <EditorPage></EditorPage>
      </Provider>
    </div>
  );
}

export default App;
