import React from "react";
import { useBlog } from "../BlogContext";
import BlogComponent from "../components/BlogComponent";

const HomePage = () => {
  const { posts } = useBlog();

  return (
    <div className="container home">
      <h1>Senaste inläggen</h1>
      {posts.map((post) => (
        <BlogComponent key={post.id} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
