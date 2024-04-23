import { useRef, useState } from "react"
import './app.scss'
import './service/firebase/firebase'
import { addPostService } from "./service/postsServices/addPost";
import { readPostService, setPosts } from "./service/postsServices/readPosts";
import { DeletePostService } from "./service/postsServices/deletePost";

function App() {
  const [postState, setPostState] = useState(false)
  const namePost = useRef();
  const description = useRef();

  const DataPreRender = async () => {
    await readPostService()
    setPostState(true)
  }

  if (postState == false) {
    DataPreRender()
    console.log('render')
  }

  const AddPost = async () => {
    await setPostState(false)
    await addPostService(namePost.current.value, description.current.value)
  }

  const DeletePost = async (id) => {
    await setPostState(false)
    await DeletePostService(id)
  }

  return (
    <>
      <div className="container">
        <input ref={namePost} placeholder="name post" type="text" />
        <input ref={description} placeholder="description" type="text" />
        <button className="button" onClick={AddPost}>ADD POST</button>
      </div>
      {
        postState ? (
        <ul>
          {
            setPosts.data.map((data, i) => (
              <li key={i}>
                <h1>{data.el.name}</h1>
                <p>{data.el.description}</p>
                <button onClick={() => DeletePost(data.id)}>delete</button>
              </li>
            ))
          }
        </ul>
        ) : (<><h1>Loading</h1></>)
      }
    </>
  )
}

export default App
