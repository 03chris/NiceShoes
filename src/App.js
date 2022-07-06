import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import ItemListContainer from './components/containers/ItemListContainer';
import ItemDetailContainer from './components/containers/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import AppContextProvider from './components/context/cartContext'

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
              <ItemListContainer />
            </Route>
            <Route exact path="/all">
              <ItemListContainer />
            </Route>
            <Route exact path="/categories/:genderCategory">
              <ItemListContainer />
            </Route>
            <Route exact path="/product/:id">
              <ItemDetailContainer />
            </Route>
            <Route exact path='/cart' component={Cart}/>
            <Route exact path='/cart/checkout' component={Checkout}/>
          </Switch>
          <Footer />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
