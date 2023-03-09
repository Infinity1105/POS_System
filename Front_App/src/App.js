import React from 'react';
import './App.css';
import { ChakraProvider, Box, useColorMode } from '@chakra-ui/react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import theme from './theme';
import Navbar from './Navbar';
import Home from './Home';
import Refill from './Refile';
import StockView from './StockView';
import Sells from './Sells';




function App() {
  // const { colorMode } = useColorMode();
  return (
  <BrowserRouter>
    <ChakraProvider theme={theme}>
  <Box>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/refill' element={<Refill/>}></Route>
      <Route path='/stockView' element={<StockView/>}></Route>
      <Route path='/sells' element={<Sells/>}></Route>
    </Routes>
  </Box>
</ChakraProvider>
  </BrowserRouter>
  );
}

export default App;
