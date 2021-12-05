import './App.css';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './Components/Home/Home';
import GithubCallback from './Components/GitHub/GithubCallback';
import {GithubRepo} from './Components/GitHub/GithubRepo';
import MyFavorites from './Components/GitHub/MyFavorites';

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} /> */}
          <Route path="/welcome" element={<GithubRepo/>} />
          <Route path="/githubrepos" element={<GithubCallback />} />
          <Route path="/myfavorites" element={<MyFavorites />} />

          
        </Routes>
      </BrowserRouter>
    </div> 
    
  );
}

export default App;
