import React, {useEffect, useState} from 'react';
import {useFetcher, useParams} from "react-router-dom";

export const Repository = () => {
    const {id}=useParams();
    const [repoName, setReponame]=useState<string>('');
    const [error, setErrror]=useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/repositories/${id}`,{
            credentials:'include',
        })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.error){
                    setErrror(data.error);
                }else{
                    setReponame(data.name);
                }
            })
    }, [id]);
    if (error) return <div>{error}</div>;
    if(!repoName) return <p>Loading...</p>;
    return(
        <div className='repository-detail'>
            <h2>Repository: {repoName}</h2>
        </div>
    );
}
