import { Provider } from 'react-redux';
import Game, { GameConfig } from './components/Game/Game';

import store from './app/store';

function App() {

  const gameConfig: GameConfig = {
    boardSize: 16,
    numMines: 40
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Game {...gameConfig}/>
      </div>
    </Provider>
    
  );
}

export default App;
