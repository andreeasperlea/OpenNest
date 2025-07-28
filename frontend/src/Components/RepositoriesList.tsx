import React, {useEffect, useState} from 'react'
import {useAuthStore} from "../stores/authStore";
import './RepositoriesList.css'

export const RepositoriesList = () => {
    const {repositories, fetchRepositories}= useAuthStore();

    useEffect(() => {
        fetchRepositories();
    }, [fetchRepositories]);
    return (
    <div className="dashboard">
      <h2 className="dashboard-title">Your Repositories</h2>
      <div className="repo-grid">
        {repositories.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h3>{repo.name}</h3>
            <p className="description">{repo.description || "No description"}</p>
            <p className="created-at">Created: {new Date(repo.created_at).toLocaleDateString()}</p>
            <span className={`privacy ${repo.is_private ? "private" : "public"}`}>
              {repo.is_private ? "🔒 Private" : "🌐 Public"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}