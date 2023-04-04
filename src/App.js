
import React, { Component } from 'react'
import { Navbar } from './components/Navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import config from './config.json'


export default class App extends Component {
  
  // apiKey = process.env.REACT_APP_NEWS_API;
  apiKey = config.apiKey
  state={
    progress : 0,
  }
  
  setProgress=(value)=>{
    console.log("setting progress");
    console.log(value);
    this.setState({progress : value});
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
          />
          <Routes>
            <Route path="/"   element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="general" country='in' category="general"/>}/>
            <Route path="/business"  element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="business" country='in' category="business"/>}/>
            <Route path="/entertainment"  element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="entertainment" country='in' category="entertainment"/>}/>
            <Route path="/general"  element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="general" country='in' category="general"/>}></Route> 
            <Route path="/health"  element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="health" country='in' category="health"/>}/>
            <Route path="/science"  element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="science" country='in' category="science"/>}/>
            <Route path="/sports"  element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="sports" country='in' category="sports"/>}/> 
            <Route path="/technology"  element={<News setProgress={this.setProgress} pageSize={5} apiKey={this.apiKey}  key="technology" country='in' category="technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
