import React, { useEffect, useState } from 'react';
import './scss/App.scss';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './pages/Navigation';
import Gallery from './pages/Gallery';
import TestRide from './pages/TestRide';
import Specifications from './pages/Specifications';
import Customisations from './pages/Customisations';
import 'simplebar';
import { connect } from 'react-redux';
import { authUser } from './actions/userActions';

function delayResize(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  }
}

const App = ({ authUser }) => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const vh = dimensions.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const handleDelayResize = delayResize(function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000)
    window.addEventListener('resize', handleDelayResize);
    return () => {
      window.removeEventListener('resize', handleDelayResize);
    }
  }, [dimensions.height]);

  useEffect(() => {
    authUser();
  }, [authUser]);

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Navigation dimensions={dimensions} />
        <Route path="/" exact render={(props) => <Home {...props} dimensions={dimensions} />} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/test-ride" component={TestRide} />
        <Route path="/specifications" component={Specifications} />
        <Route path="/customisations" component={Customisations} />
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = {
  authUser,
}

export default connect(null, mapDispatchToProps)(App);
