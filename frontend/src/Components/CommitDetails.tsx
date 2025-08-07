import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import './CommitDetails.css';
interface Commit{
    id:number;
    message:string;
    committed_at:string;
    content: string | File;
    path:string;
    author_name:string;
}

const CommitDetails = () => {
    const {commitId}=useParams<{commitId:string}>()
    const [commit, setCommit]=useState<Commit | null>(null);
    const[error, setError]=useState('');

    useEffect(() => {
        if (!commitId) {
          setError('No commit ID provided');
          return;
        }
        fetch(`http://localhost:8000/commits/${commitId}`, {
            credentials:'include',
        })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.detail){
                    setError(data.detail);
                }else{
                    setCommit(data);
                }
            })
            .catch((err)=>{
                setError("Failed to load commit");
            })
        }, [commitId]);

    if (error) return <p>{typeof error === 'string' ? error : JSON.stringify(error)}</p>;
    if(!commit) return <p>Loading...</p>
    return (
      <div className='commit-details'>
          <span className="commit-tag">Commit</span>
            <p className='commit-description'><strong>Message:</strong> {commit.message}</p>
            <p className='commit-description'><strong>Path:</strong> {commit.path}</p>
            <p className="commit-description">
                <strong>Author:</strong> {commit.author_name}
            </p>
           <p className='created-date'>
                Created At: {new Date(commit.committed_at).toLocaleDateString()}
            </p>
            <div className="commit-content">
                <h4>Content:</h4>
                  <pre><code>
                    {typeof commit.content === 'string'
                      ? commit.content
                      : '[File uploaded – cannot display raw]'}
                  </code></pre>
                </div>
            </div>
    );
}

export default CommitDetails;