import React, { useState } from "react";
import { useBlog } from "../BlogContext";
import BlogComponent from "./BlogComponent";

const MyPostsPage = () => {
  const { currentUser } = useBlog();
  const { posts, addPost, editPost, deletePost } = useBlog();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      author: currentUser,
      title,
      content,
      comments: [],
    };
    addPost(newPost);
    setTitle("");
    setContent("");
  };

  const handleEditPost = (postId, updatedPost) => {
    editPost(postId, updatedPost);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  return (
    <div className="container myPosts">
      <h1>My Posts</h1>
      <div className="newPost">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <BlogComponent
            post={post}
            onDelete={() => handleDeletePost(post.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default MyPostsPage;
