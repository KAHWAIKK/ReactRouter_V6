import { useState,useEffect,createContext    } from "react";
import { /* Route, Routes,  */useNavigate } from 'react-router-dom';
/* import { useState, useEffect } from 'react'; */
import { format } from 'date-fns';
import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from "../hooks/useWindowSize";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const {data,fetchError,isLoading} = useAxiosFetch(
    "http://localhost:3800/posts"
  )
  const {width} = useWindowSize();
  
 useEffect(() => {
  setPosts(data)
 },[data])
 
  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
    const response = await api.post('/posts',newPost);
    console.log(response.data)
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }
  /* Updating using Axios */
  const handleEdit = async (id) =>{
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      console.log(response.data)
      setPosts(posts.map(post => post.id === id ?
        {...response.data} : post))
        setEditTitle('')
        setEditBody('')
        navigate('/');
    } catch (error) {
      console.log(`Error: ${err.message}`)
    }
  }

/* Deleting using Axios */
  const handleDelete = async (id) => {
    try {
    const deletedPost = await api.delete(`/posts/${id}`);
    console.log(deletedPost.data);//returns an empty array
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/');
    } catch (err){
      console.log(`Error: ${err.message}`)
    }
  }

return (
    <DataContext.Provider value = {{
        width,search,setSearch,searchResults,fetchError,
        isLoading,handleSubmit,postTitle,setPostTitle,
        postBody,setPostBody,
        posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle,handleDelete
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext;