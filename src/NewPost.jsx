import React from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const {handleSubmit,postTitle,setPostTitle,postBody,setPostBody} = useContext(DataContext);
  return (
    <main className='NewPost'>
        <h2>New Post</h2>
        <form
          action="submit"
          className='newPostForm'
          onSubmit={handleSubmit}
          >
            <label htmlFor="postTitle">Title : </label>
            <input 
              type="text"
              id='postTitle' 
              required
              value={postTitle} 
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post : </label>
            <textarea 
               id="postBody" cols="30" rows="10" required 
              value={postBody} placeholder="Add your post"
              onChange={(e) => setPostBody(e.target.value)}
              >
            </textarea>
            <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default NewPost

/* const NewPost = ({
  handleSubmit, postTitle, setPostTitle, postBody, setPostBody
}) => {
  return (
      <main className="NewPost">
          <h2>New Post</h2>
          <form className="newPostForm" onSubmit={handleSubmit}>
              <label htmlFor="postTitle">Title:</label>
              <input
                  id="postTitle"
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
              />
              <label htmlFor="postBody">Post:</label>
              <textarea
                  id="postBody"
                  required
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
              />
              <button type="submit">Submit</button>
          </form>
      </main>
  )
}

export default NewPost */