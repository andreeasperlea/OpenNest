import React, { useState } from 'react';

interface CommitModalProps {
  repositoryId: number;
  onClose: () => void;
  onCommitted: () => void;
}

const CommitModal: React.FC<CommitModalProps> = ({ repositoryId, onClose, onCommitted }) => {
  const [message, setMessage] = useState('');
  const [path, setPath] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!message.trim() || !path.trim() || (!content && !file)) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('message', message);
    formData.append('path', path);
    if (file) {
      formData.append('file', file);
    } else {
      formData.append('content', content);
    }

    try {
      const response = await fetch(`http://localhost:8000/repositories/${repositoryId}/commits`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        onCommitted();
      } else {
        const data = await response.json();
        setError(data.detail || 'Failed to commit');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h3>New Commit</h3>
        {error && <p className='error'>{error}</p>}
        <input
          type='text'
          placeholder='Commit message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type='text'
          placeholder='File path (e.g. src/index.js)'
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <textarea
          placeholder='Paste file content here (optional if uploading file)'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type='file' onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <div className='modal-actions'>
          <button onClick={onClose} disabled={loading}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Committing...' : 'Commit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommitModal;
