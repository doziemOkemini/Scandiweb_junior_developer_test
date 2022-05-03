import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

import React, { Component } from 'react';
import Category  from './Components/Category/Category';
import Cart from './Components/Cart/Cart';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDP from './Components/PDP/ProductDP';
import Header from './Components/Misc/Header';

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});


class App extends Component {
 render() {
    return (
      <ApolloProvider client={client}>
        <div className='App'>    
          <Router>
          <Header />
            <Routes>
              <Route exact path='/' element={<Category/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/product/:id' element={<ProductDP/>} />
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
    );
 }
}

export default App;
