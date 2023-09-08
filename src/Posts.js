import React, { useState, useEffect } from "react";
import Comments from "./Comments";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/"
        );

        if (!response.ok) {
          throw new Error("Error loading posts");
        }

        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        <h1 className="pageHeading">Posts & their respective comments</h1>
        <div>
          {isLoading ? (
            <div className="loadingState">Loading...</div>
          ) : error ? (
            <div className="errorState">Error: {error.message}</div>
          ) : (
            posts.map((post) => (
              <ul key={post.id} className="post">
                <div>
                  <li className="heading">Post - {post.id}</li>
                </div>
                <div>
                  <li className="heading">Title</li>
                  <li>{post.title}</li>
                </div>
                <div>
                  <li className="heading">Content</li>
                  <li>{post.body}</li>
                </div>
                <Comments postId={post.id} />
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
