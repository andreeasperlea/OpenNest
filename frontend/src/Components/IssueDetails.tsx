import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import "./IssueDetails.css";

interface Issue{
    id:number;
    title:string;
    description:string;
    is_open:boolean;
    created_at:string;
}


const IssueDetails = ()=>{
    const{issueId}=useParams<{issueId:string}>();
    const [issue, setIssue]=useState<Issue | null>(null);
    const [error, setError]=useState('');

    useEffect(()=>{
        fetch(`http://localhost:8000/issues/${issueId}`,{
            credentials:'include',
        })
            .then((res)=> res.json())
            .then((data)=>{
                if(data.detail){
                    setError(data.detail);
                }else{
                    setIssue(data);
                }
            })
            .catch((err)=>{
                setError("Failed to load issue");
            });
    }, [issueId]);

    const handleToggleStatus =() =>{
        fetch(`http://localhost:8000/issues/${issueId}/toggle-status`,{
            method:'PUT',
            credentials:'include',
        })
            .then((res)=>res.json())
            .then((data)=>{
                setIssue(data);
            })
            .catch(()=>{
                setError("Failed to toggle issue status");
            });
    };

    if(error) return <p>{error}</p>
    if(!issue) return <p>Loading...</p>
    return(
        <div className={`issue-details ${issue.is_open ? 'open' : 'closed'}` }>
            <h2>{issue.title}</h2>
            <span className='status-tag'>{issue.is_open ? 'Open' : 'Closed '}</span>
            <button onClick={handleToggleStatus} className='status-toggle-btn'>
                Mark as {issue.is_open ? "Closed" : "Open"}
            </button>
            <p className="issue-description">{issue.description}</p>
            <p className='created-date'> Created At: {new Date(issue.created_at).toLocaleDateString()}
            </p>
        </div>
    );
}

export default IssueDetails