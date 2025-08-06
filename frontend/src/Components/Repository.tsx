import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './Repository.css';
import './IssueModal';
import {RepositoryModal} from "./RepositoryModal";
import IssueModal from "./IssueModal";
interface Commit {
  id: number;
  message: string;
  commit_hash: string;
  committed_at: string;
}

interface Issue {
  id: number;
  title: string;
  description: string;
  is_open: boolean;
  created_at: string;
}

interface PullRequest {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

interface RepositoryData {
  id: number;
  name: string;
  description: string;
  is_private: boolean;
  created_at: string;
  commits: Commit[];
  issues: Issue[];
  pull_requests: PullRequest[];
}

export const Repository = () => {
  const { id } = useParams();
  const [repoData, setRepoData] = useState<RepositoryData | null>(null);
  const [error, setError] = useState("");
  const [showIssueModal, setShowIssueModal]=useState(false);
  const navigate=useNavigate();
  const fetchRepository = () => {
  fetch(`http://localhost:8000/repositories/${id}`, {
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.detail) {
        setError(data.detail);
      } else {
        setRepoData(data);
      }
    })
    .catch((err) => {
      console.error("Error fetching repository:", err);
      setError("Failed to fetch repository");
    });
};

useEffect(() => {
  fetchRepository();
}, [id]);

  if (error) return <p>{error}</p>;
  if (!repoData) return <p>Loading...</p>;

  return (
    <div className='repository-detail'>
      <h2>{repoData.name}</h2>
      <p>{repoData.description}</p>

      <h3>Commits</h3>
      <ul>
        {repoData.commits.length === 0 && <li>No commits found</li>}
        {repoData.commits.map((c) => (
          <li key={c.id}>{c.message}</li>
        ))}
      </ul>

      <h3>Issues</h3>
      <ul>
        {repoData.issues.length === 0 && <li>No issues found</li>}
        {repoData.issues.map((i) => (
          <li key={i.id}>{i.title}</li>
        ))}
      </ul>
        <div className='issue-actions'>
        <button className="create-issue-btn" onClick={() => setShowIssueModal(true)}>
            + New Issue
          </button>
        </div>
      <h3>Pull Requests</h3>
      <ul>
        {repoData.pull_requests.length === 0 && <li>No pull requests found</li>}
        {repoData.pull_requests.map((pr) => (
          <li key={pr.id}>{pr.title}</li>
        ))}
      </ul>
        {showIssueModal && (
        <IssueModal
          repositoryId={repoData.id}
          onClose={() => setShowIssueModal(false)}
          onCreated={() => {
            setShowIssueModal(false);
            fetchRepository(); // Refresh data
          }}
        />
      )}
    </div>
  );
};
