import React, { useState } from 'react';

export default function DiscussionBoard() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), content: newPost }]);
      setNewPost('');
    }
  };

  return (
    <section aria-label="Discussion Board">
      <h2>Discussion Board</h2>
      <textarea 
        value={newPost} 
        onChange={(e) => setNewPost(e.target.value)} 
        placeholder="Write your post here"
      />
      <button onClick={addPost}>Post</button>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </section>
  );
}
