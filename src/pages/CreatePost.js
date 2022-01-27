import React from 'react';
import { useRef } from 'react';
import {addDoc, collection} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const titleRef = useRef();
  const contentRef = useRef();

  let navigate = useNavigate();

  const postCollectionRef = collection(db,'posts');
  const createPost = async()=>{
      await addDoc(postCollectionRef, {
        title:titleRef.current.value,
        postText: contentRef.current.value,
        author:{ name: auth.currentUser.displayName ,
           id: auth.currentUser.uid
          }
      })
      navigate('/');
  }

  return <div className='createPostPage'>
    <div className="cpContainer">
      <h1>Create A Post</h1>
      <div className="inputGp">
        <label htmlFor="title">Title:</label>
        <input type="text"  id="title" ref={titleRef}/>
      </div>
      <div className="inputGp">
        <label htmlFor="content">Post:</label>
        <textarea id="content" placeholder='Start writing...' ref={contentRef}/>
      </div>
      <button onClick={createPost}>Submit Post</button>
    </div>
  </div>;
};

export default CreatePost;
