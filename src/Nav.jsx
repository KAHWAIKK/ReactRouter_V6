import React from 'react'
import {Link} from 'react-router-dom';

const Nav = ({search,setSearch}) => {
  return (
    <nav className='Nav'>
        <form className='searchForm'onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">
                    Search Posts
                </label>
                <input 
                    type="text"
                     id='search'
                     placeholder='Search for posts'
                     value={search}
                     onChange={(e)=> setSearch(e.target.value)}
                />
        </form>
        <ul>
            <li><Link to="/"></Link>Home</li>
            <li><Link to="post"></Link>Post</li>
            <li><Link to="about"></Link>About</li>
        </ul>
    </nav>
  )
}

export default Nav