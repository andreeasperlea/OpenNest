import React, { useEffect, useState } from 'react';
import { useAuthStore } from "../stores/authStore";
import './RepositoriesList.css';
import { RepositoryModal } from './RepositoryModal';

export const RepositoriesList = () => {
  const { repositories, fetchRepositories } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
          <h2 className="dashboard-title">Your Repositories</h2>
          <button className="create-repo-btn" onClick={() => setShowModal(true)}>
            + New Repository
          </button>
      </div>

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

      {showModal && (
        <RepositoryModal
          onClose={() => setShowModal(false)}
          onCreated={() => fetchRepositories()}
        />
      )}
    </div>
  );
};
