import './App.css';
import Login from "./pages/Login.js";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from "./context/auth"
import Routes from './routes/Routes'

// import Home from './pages/Home';
// import SignUp from './pages/SignUp';
// import ForgotPassword from './pages/forgotPassword';
// import Verification from './pages/Verification';
// import Mesin from './pages/Mesin';
// import ProfilePage from './pages/profile';
// import Notification from './pages/Notification';
// import Monitoring from './pages/Monitoring';
// import TambahPabrik from './pages/TambahPabrik';
// import UbahPabrik from './pages/UbahPabrik';
// import TambahMesin from './pages/TambahMesin';
// import UbahMesin from './pages/UbahMesin';

function App() {
  return(
    <BrowserRouter>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </BrowserRouter>
  )
  // const data = [1, 2, 3, 4, 5]

  // return (
  //   <div className="App">
  //     <Router>
  //       <Switch>
  //         <Route
  //           exact
  //           path={'/'}
  //         >
  //           <Login />
  //         </Route>

  //         <Route
  //           exact
  //           path={'/forgotpassword'}
  //         >
  //           <ForgotPassword
  //           />
  //         </Route>

  //         <Route
  //           exact
  //           path={'/signUp'}
  //         >
  //           <SignUp />
  //         </Route>

  //         <Route
  //           exact
  //           path={'/verification'}
  //         >
  //           <Verification />
  //         </Route>

  //         <Route
  //           exact
  //           path={'/pabrik'}
  //         >
  //           <Home />
  //         </Route>

  //         <Route
  //           exact
  //           path={`/pabrik/:homeId`}
  //           render={(props) => <Mesin {...props} />}
  //         />

  //         <Route
  //           exact
  //           path={`/profile`}
  //         >
  //           <ProfilePage />
  //         </Route>

  //         <Route
  //           exact
  //           path={`/notifikasi`}
  //         >
  //           <Notification />
  //         </Route>

  //         <Route
  //           exact
  //           path={`/pabrik/:homeId/mesin/:mesinId`}
  //           render={(props) => <Monitoring {...props} />}
  //         />

  //         <Route
  //           exact
  //           path={`/tambah-pabrik`}
  //         >
  //           <TambahPabrik />
  //         </Route>

  //         <Route
  //           exact
  //           path={`/ubah-pabrik`}
  //         >
  //           <UbahPabrik />
  //         </Route>

  //         <Route
  //           exact
  //           path={`/tambah-mesin`}
  //         >
  //           <TambahMesin />
  //         </Route>

  //         <Route
  //           exact
  //           path={`/ubah-mesin`}
  //         >
  //           <UbahMesin />
  //         </Route>

  //       </Switch>
        
  //     </Router>
  //   </div>
  // );
}

export default App;
