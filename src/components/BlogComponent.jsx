import React, { useState } from "react";
import { useBlog } from "../BlogContext";

const BlogComponent = ({ post, onDelete }) => {
  const { author, title, content, comments } = post;
  const { currentUser } = useBlog();
  const { addComment } = useBlog();
  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    addComment(post.id, comment);
    setComment("");
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>Författare: {author}</p>
      <p>{content}</p>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <input className="commentDesign"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Kommentera"
      />
      <button className="post" onClick={handleAddComment}>Skicka</button>
      {currentUser === author && onDelete && (
        <button onClick={onDelete}>Radera</button>
      )}
    </div>
  );
};

export default BlogComponent;
