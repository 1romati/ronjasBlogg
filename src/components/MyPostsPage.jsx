import React, { useState } from "react";
import { useBlog } from "../BlogContext";
import { useUser } from "../UserContext";
import BlogComponent from "./BlogComponent";

const MyPostsPage = () => {
  const { posts, addPost, editPost, deletePost } = useBlog();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      author: user.email,
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
      <h1>Gör ett nytt inlägg</h1>
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
        <button onClick={handleAddPost}>Publicera</button>
      </div>
      {posts
        .filter((post) => post.author === user.email)
        .map((post) => (
          <BlogComponent
            key={post.id}
            post={post}
            onDelete={() => handleDeletePost(post.id)}
            onEdit={handleEditPost}
          />
        ))}
    </div>
  );
};

export default MyPostsPage;
