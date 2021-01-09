import {useEffect, useContext} from 'react'
import {AppContext, Context} from './config/Context'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './config/PrivateRoute'
import LandingGuest from './pages/LandingGuest'
import LandingLogin from './pages/LandingLogin'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import MyProfile from './pages/MyProfile'
import AddProduct from './pages/AddProduct'
import AddToping from './pages/AddToping'
import Admin from './pages/Admin'
import NotFound from './config/NotFound'
import {API, setAuthToken} from './config/API'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const [state, dispatch] = useContext(AppContext)

  const loadUser = async () => {
    try {
      const response = await API("/check-auth")
      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        })
      }

      dispatch({
        type: "USER_LOAD",
        payload: response.data.data,
      })

    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
  
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingGuest} />
          <PrivateRoute exact path="/home" component={LandingLogin} />
          <PrivateRoute exact path="/detail/:id" component={Detail} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/profile" component={MyProfile} />
          <PrivateRoute exact path="/add-product" component={AddProduct} />
          <PrivateRoute exact path="/add-toping" component={AddToping} />
          <PrivateRoute exact path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Router>
  );
}

export default App;
