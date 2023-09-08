import React, { useState, useEffect } from "react";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      if (showComments) {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
          );

          if (!response.ok) {
            throw new Error("Error loading comments");
          }

          const data = await response.json();
          setComments(data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      }
    }

    fetchComments();
  }, [postId, showComments]);

  // function for toggling comment button.
  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <div>
      <div className="buttonPosition">
        <button onClick={toggleComments} className="commentButton">
          {showComments ? "Hide Comments" : "Read Comments"}
        </button>
      </div>

      {isLoading ? (
        <div className="loadingState">Loading...</div>
      ) : error ? (
        <div className="errorState">Error:{error.message}</div>
      ) : showComments ? (
        <div>
          {comments.map((comment) => (
            <ul key={comment.id} className="comment">
              <div>
                <li className="heading">Comment - {comment.id}</li>
              </div>
              <div>
                <li className="heading">Name - {comment.name}</li>
              </div>
              <div>
                <li className="heading">Email - {comment.email}</li>
              </div>
              <div>
                <li className="heading">Content</li>
                <li>{comment.body}</li>
              </div>
            </ul>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
