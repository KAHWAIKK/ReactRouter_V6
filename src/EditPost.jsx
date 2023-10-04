import React from 'react'
import { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'

const EditPost = ({
    posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle
}) => {

    const {id} = useParams();//getting the id parameter of a post using the useParams
    const post = posts.find(post =>  (post.id).toString() === id);//getting the specific post using the id and converting it to a string

    useEffect(() => {
        if (post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post,setEditTitle,setEditBody])
  return (
    <main className='NewPost'>
        { editTitle &&
            <>
                <h2>Edit Post</h2>
                <form
                /* action="submit" */
                className='newPostForm'
                onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor="postTitle">Title : </label>
                    <input 
                    type="text"
                    id='postTitle' 
                    required
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post : </label>
                    <textarea 
                    id="postBody" cols="30" rows="10" required 
                    value={editBody} placeholder="Add your post"
                    onChange={(e) => setEditBody(e.target.value)}
                    >
                    </textarea>
                    <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
            </>
        } 
        {
            !editTitle &&
              <>
                <h2>Opps,Post Not Found</h2>
                <p>Well, that's disappointing</p>
                <p>
                  <Link to="/">Go back to Our Homepage</Link>
                </p>
              </>
        }
    </main>
  )
}

export default EditPost