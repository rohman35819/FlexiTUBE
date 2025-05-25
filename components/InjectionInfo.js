import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import '../styles/innovation.css';

/**
 * InnovationIdeas component fetches and displays crowd-sourced ideas with pagination and search.
 */
export default function InnovationIdeas() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const fetchIdeas = async ({ queryKey }) => {
    const [, page, search] = queryKey;
    const res = await fetch(`/api/innovation?page=${page}&search=${encodeURIComponent(search)}`);
    if (!res.ok) throw new Error('Failed fetching ideas');
    return res.json();
  };

  const { data, isLoading, error } = useQuery(['ideas', page, search], fetchIdeas, {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div className="innovation-loading">Loading ideas...</div>;
  if (error) return <div className="innovation-error">Error: {error.message}</div>;

  return (
    <section className="innovation-ideas">
      <h2>Innovation Ideas</h2>
      <input
        type="text"
        placeholder="Search ideas..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search innovation ideas"
      />
      <ul className="ideas-list">
        {data.ideas.map(({ id, title, summary, author }) => (
          <li key={id} className="idea-item">
            <h3>{title}</h3>
            <p>{summary}</p>
            <p><em>by {author}</em></p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(old => (!data.hasMore ? old : old + 1))} disabled={!data.hasMore}>
          Next
        </button>
      </div>
    </section>
  );
}

InnovationIdeas.propTypes = {};
