//import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MainRoutes from './components/Main';
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    
    <div className="App">
       <MainRoutes/>
    </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
