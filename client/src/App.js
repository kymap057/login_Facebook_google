import './App.css';
import React, {useState,useEffect,useCallback} from 'react';
import LoginGoogle from './components/GoogleLogin';
import LoginFacebook from './components/FacebookLogin';
import TableUser from './components/TableUser';


function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState()
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')));
      setIsLogin(false);
    }
  },[localStorage])
  const logout =()=>{
    localStorage.clear();
    setUser(null);
    setIsLogin(true);
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
          auth2.disconnect().then(console.log("SUCCESS...!"))
          .catch(err=> console.log(err.message))
      }
    }
  }
  return (
    <div className="App">
      <header className="App-header">
          <h1>Quản lí User</h1>
      </header>
      {
        user &&
        <div>
          <h1>hello {user.name}</h1>
          <div className="btn-login logout"style={{border:"1px solid", width:"10%", margin:"0 auto",borderRadius:"3px"}} onClick={logout}>Logout</div>
        </div>
      }
      {
        isLogin && 
        <div>
          <LoginGoogle />
          <LoginFacebook />
        </div>
      }
      {
        user &&
        <TableUser/>
      }
    </div>
  );
}

export default App;
