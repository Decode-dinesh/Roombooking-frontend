import Header from './components/Header/Header';
import {BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './components/screens/HomeScreen';
import Bookingscreen from './components/screens/Bookingscreen';
import Register from './components/screens/Register';
import Login from './components/screens/Login';
import ProfileScreen from './components/screens/ProfileScreen';
import AdminScreen from './components/screens/AdminScreen';

function App() {
  return (
    <div className="App">
        <Header />
        <BrowserRouter>
          <Route path="/home" exact component={HomeScreen} />
          <Route path= "/book/:roomid/:fromdate/:todate" exact component={Bookingscreen} />
          <Route path= "/register" exact component={Register} />
          <Route path= "/" exact component={Login} />
          <Route path="/profile" exact component={ProfileScreen} />
          <Route path="/dashboard" exact component={AdminScreen} />
        </BrowserRouter>
    </div>
  );
}

export default App;
