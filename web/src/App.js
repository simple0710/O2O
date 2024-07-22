import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import Counter from './pages/Counter';
import Input from './pages/Input';
import Input2 from './pages/Input2';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Locker from './pages/Locker';
import Request from './pages/Request';
import ChangePwd from './pages/ChangePwd';
import './App.css';



function App() {
  return (
    <div className="App">
      {/* <nav>
        <Link to="/profile">Profile</Link>
        /<Link to="/counter">Counter</Link>
        /<Link to="/input">Input</Link>
        /<Link to="/input2">Input2</Link>
        /<Link to="/mainpage">MainPage</Link>
        /<Link to="/login">Login</Link>
        /<Link to="/request">Request</Link>
      </nav> */}
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/counter' element={<Counter />} />
          <Route path='/input' element={<Input />} />
          <Route path='/input2' element={<Input2 />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/locker' element={<Locker />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/request' element={<Request />} />
          <Route path='/changepwd' element={<ChangePwd />} />
        </Routes>

    </div>
  );
}

export default App;
