import './App.css';
import Header from './components/Header';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Hero from './components/Hero';
import Home from './components/Home';
function App() {
  return (
    <Routes>
      <Route path ="/" element={
        <div>
          <Header/>
          <Hero/>
         </div>
      } />
      <Route path="/channels" element ={
            <Home/>
      } />
      <Route path="/channels/:id" element ={
            <Home/>
      } />
    </Routes>
  );
}

export default App;
