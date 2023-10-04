import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import ErrorPage from './ErrorPage';
import EditPost from './EditPost';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';


function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  /* Combining useEffect and Axios package to handle GET requests */
  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const response = await api.get('/posts')
        console.log(response)
        console.log(response.data)
        setPosts(response.data)
        } catch (error) {
          if (error.response) {
              //if response range is not within range of 200 ,axios docs provide the following code
              console.log(err.response.data)
              console.log(err.response.data.message)
              console.log(err.response.status)
              console.log(err.response.headers)
            } else {
              console.log(`Error: ${error.message}`)
            }
        }
    }
    fetchPosts();
  },[]);

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [posts, search])


  /* Posting using Axios */
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
    <Routes>
      <Route path="/" element={<Layout
        search={search}
        setSearch={setSearch}
      />}>
        <Route index element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route index element={<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          
          <Route path=":id" element={<PostPage
            posts={posts}
            handleDelete={handleDelete}
          />} />
        </Route>
        <Route path="post">
        <Route path=':id' element={<EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;