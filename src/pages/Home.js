import React, { useEffect, useState,useCallback } from 'react';
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore'
import { auth, db } from '../firebase-config';

const Home = ({isAuth}) => {
  const [postList, setPostList] = useState([]);


  const getPosts = useCallback(async (ref) => {
    const data = await getDocs(ref);
    setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  },[])
  const deletePost = async (id)=>{
    const postDoc = doc(db, "posts",id);
    await deleteDoc(postDoc);
    const postCollectionRef = collection(db, "posts");
    getPosts(postCollectionRef);
  }

  useEffect(()=>{
      const postCollectionRef = collection(db, "posts");
      getPosts(postCollectionRef)
  },[getPosts])
  return <div className='homePage'>
    {postList.map(post=>{
      return <div className="post" key={post.id}>
        <div className="postHeader">
          <div className="title">
            <h1>{post.title}</h1>
          </div>
          <div className="deletePost">
            {isAuth && post.author.id === auth.currentUser.uid &&
            <button onClick={()=>{deletePost(post.id)}}>&#128465; </button>}
          </div>
        </div>
        <div className="postTextContainer">{post.postText}</div>
        <h3>@{post.author.name}</h3>
      </div>
    })}
  </div>;
};

export default Home;
