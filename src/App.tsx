import { Provider } from 'react-redux';
import Game from './components/Game/Game';

import store from './app/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Game/>
      </div>
    </Provider>
    
  );
}

export default App;
