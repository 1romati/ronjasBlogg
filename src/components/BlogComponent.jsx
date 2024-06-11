import React, { useState } from "react";
import { useBlog } from "../BlogContext";
import { useUser } from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const BlogComponent = ({ post, onDelete, onEdit }) => {
  const { author, title, content, comments } = post;
  const { addComment, editComment, deleteComment } = useBlog();
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const handleAddComment = () => {
    if (user) {
      const comment = { username: user.email, text: commentText };
      addComment(post.id, comment);
      setCommentText("");
    } else {
      alert("Du behöver vara inloggad för att kunna kommentera.");
    }
  };

  const handleSaveEditPost = () => {
    if (user && user.email === author) {
      onEdit(post.id, { ...post, title: editedTitle, content: editedContent });
      setIsEditingPost(false);
    }
  };

  const handleSaveEditComment = () => {
    if (user && editCommentIndex !== null) {
      const updatedComment = {
        ...comments[editCommentIndex],
        text: editCommentText,
      };
      editComment(post.id, editCommentIndex, updatedComment);
      setEditCommentIndex(null);
      setEditCommentText("");
    }
  };

  const handleDeleteComment = (index) => {
    if (user) {
      deleteComment(post.id, index);
    }
  };

  return (
    <div className="blog-post">
      {isEditingPost ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button className="save-button" onClick={handleSaveEditPost}>
            Spara
          </button>
          <button
            className="cancel-button"
            onClick={() => setIsEditingPost(false)}
          >
            Avbryt
          </button>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <p>Författare: {author}</p>
          <p>{content}</p>
        </>
      )}
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="comment">
            <strong>{comment.username}:</strong>
            {editCommentIndex === index ? (
              <>
                <input
                  type="text"
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                />
                <button className="save-button" onClick={handleSaveEditComment}>
                  Spara
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditCommentIndex(null)}
                >
                  Avbryt
                </button>
              </>
            ) : (
              <>
                {comment.text}
                {user && user.email === comment.username && (
                  <>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteComment(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditCommentIndex(index);
                        setEditCommentText(comment.text);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      <input
        className="comment-input"
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Kommentera"
      />
      <button className="comment-button" onClick={handleAddComment}>
        Skicka
      </button>
      {user && user.email === author && (
        <>
          <button
            className="edit-button"
            onClick={() => setIsEditingPost(true)}
          >
            Redigera
          </button>
          <button className="delete-button" onClick={onDelete}>
            Radera
          </button>
        </>
      )}
    </div>
  );
};

export default BlogComponent;
