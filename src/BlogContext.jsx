import React, { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Jane Doe",
      title: "Det första inlägget",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum, inventore.",
      comments: [],
    },
    {
      id: 2,
      author: "John Doe",
      title: "Det andra inlägget",
      content:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, ipsa.",
      comments: [],
    },
  ]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const editPost = (postId, updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const addComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <BlogContext.Provider
      value={{ posts, addPost, editPost, deletePost, addComment }}
    >
      {children}
    </BlogContext.Provider>
  );
};
