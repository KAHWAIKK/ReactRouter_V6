import React, { useContext } from 'react'
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import useWindowSize from './hooks/useWindowSize';
import { DataProvider } from './context/DataContext';

const Layout = ({}) => {
  const {width} = useWindowSize();
  /* const {search,setSearch} = useContext(); */
  return (
    <div className='App'>
      <DataProvider>
        <Header title = "Kevin's Blog" width={width}/>
        <Nav 
          /* search={search}
          setSearch={setSearch} */
        />
        <Outlet />
        <Footer/>
      </DataProvider>

    </div>
  )
}

export default Layout