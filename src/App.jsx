import Layout from './Layout';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import ErrorPage from './ErrorPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
//import { format } from 'date-fns';

function App() {
  const[posts,setPosts]= useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const[ search,setSearch] = useState("")
  const[ searchResults,setSearchResults] = useState([])
 
  return (
      <Routes>
        {/* Top level route that supports our layout that contains the header,nav and footer and all other content is in the outlet component that is imported */}
        <Route path="/" element = {<Layout
          search={search}
          setSearch={setSearch}
          />}>
            {/* When we acces the items in the outlet component,we get the Home component by default(index)  */}
          <Route index element={<Home posts={posts} />}/>
            <Route path="post">
              < Route index element={<NewPost 

              />}
            />
            <Route path=':id' 
                  element={<PostPage
              
                    />}
            />
          </Route>
          <Route path="about" element={<About/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Route>
      </Routes>
      
  );
}

export default App;