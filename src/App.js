import React from 'react'
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
  } from "react-router-dom";
import Home from './pages/home';
import Edit from './pages/edit';
import Add from './pages/add';
import View from './pages/view';
export default class extends React.Component{
  render(){
    return  <Router>
    <Switch>
      
      <Route exact path='/' element={<Home />}/>
      <Route exact path='/edit/:id' element={<Edit />}/>
      <Route exact path='/add' element={<Add />}/>
      <Route exact path='/view/:id' element={<View />}/>
     
     

   


    </Switch>
  </Router>
  }
}