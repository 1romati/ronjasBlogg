import React from "react";
import { useBlog } from "../BlogContext";
import BlogComponent from "./BlogComponent"; // Fix import path

const HomePage = () => {
  const { posts, editPost, deletePost } = useBlog();

  const handleEditPost = (postId, updatedPost) => {
    editPost(postId, updatedPost);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
  };

  return (
    <div className="container home">
      <h1>Senaste inläggen</h1>
      {posts.map((post) => (
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

export default HomePage;
