import React, {useState} from 'react';
import './IssueModal.css'
interface IssueModalProps{
    repositoryId:number;
    onClose: () => void;
    onCreated: ()=> void;
}


const IssueModal:React.FC<IssueModalProps> = ({repositoryId,onClose, onCreated}) =>{
    const [title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState('');

    const handleSubmit= async () => {
        if(!title.trim()){
            setError("Title is required");
            return;
        }
        setLoading(true);
        setError('');

        try{
            const response= await fetch(`http://localhost:8000/repositories/${repositoryId}/issues`,{
                method: 'POST',
                credentials:'include',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({title, description}),
            });

            if(response.ok){
                onCreated();
            }else {
                const data = await response.json();
                setError(data.detail || "Failed to create issue");
            }
        }catch (err){
            console.error(err);
            setError("Network error");
        }finally {
            setLoading(false);
        }
    }
    return(
        <div className='modal-overlay'>
            <div className="modal">
                <h3>Create New Issue</h3>
                {error && <p className="error">{error}</p>}
                <input type='text' placeholder='Issue title' value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <textarea placeholder='Issue description'
                          value={description}
                          onChange={(e)=>setDescription(e.target.value)}
                />
                <div className='modal-actions'>
                     <button onClick={onClose} disabled={loading}>Cancel</button>
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Issue'}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default IssueModal;