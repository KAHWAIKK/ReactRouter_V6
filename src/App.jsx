import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import ErrorPage from './ErrorPage';
import EditPost from './EditPost';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
/* import { format } from 'date-fns'; */
/* import api from './api/posts'; */
/* import useAxiosFetch from './hooks/useAxiosFetch'; */
import { DataProvider } from './context/DataContext';


function App() {

  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Layout
          /* search={search}
          setSearch={setSearch} */
        />}>
          <Route index element={<Home/>}/>
          <Route path="post">
            <Route index element={<NewPost/>} />
            <Route path=":id" element={<PostPage/>} />
            <Route path=':id' element={<EditPost/>} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;