
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import { Route, Routes, useLocation } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion'

function Pages() {

  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnte={false}>
      <Routes location={location} key={location.pathname}>
          <Route path='/Bhashi-s-Kitchen' element={<Home/>}/>
          <Route path='/Bhashi-s-Kitchen/cuisine/:type' element={<Cuisine/>} />
          <Route path='/Bhashi-s-Kitchen/searched/:search' element={<Searched/>} />
          <Route path='/Bhashi-s-Kitchen/recipe/:name' element={<Recipe/>} />
      </Routes>
      </AnimatePresence>
  )
}


export default Pages




