import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeftSideMenu from './side/LeftSideMenu.js';
import MainBody from './main/MainBody.js';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <LeftSideMenu />
        <MainBody />
        
      </BrowserRouter>
    </div>
  );
}

export default App;
