import './App.scss';
import 'animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-range-slider-input/dist/style.css';
import 'react-tabs/style/react-tabs.css';

import "bootstrap/dist/js/bootstrap.bundle"
import Routes from 'pages/Routes';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
function App() {

  const { pathname } = useLocation()

  useEffect(() => {
    window.scroll(0, 0)
  }, [pathname])

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
