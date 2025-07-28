import React, {useState} from 'react'
import './RepositoryModal.css'
interface CreateRepositoryModalProps{
    onClose: () => void;
    onCreated: () => void;
}

export const RepositoryModal: React.FC<CreateRepositoryModalProps> = ({
    onClose,
    onCreated,
                                                                      }) => {
    const [formData, setFormData]= useState({
            name:'',
            description:'',
            is_private:false,
        }
    )
    const handleCreateRepo= async () => {
        try{
            const res= await fetch('http://localhost:8000/create-repository',{
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if(res.ok){
                onCreated();
                onClose();
            }else{
                alert("Failed to create repository");
            }
        }catch(err){
            console.log('Error creating repository', err);
        }
    }
    return(
        <div className='modal-backdrop'>
            <div className='modal'>
                <h3>Create new repository</h3>
                <input type='text'
                       placeholder='Repository name'
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <textarea placeholder='Description' value={formData.description}  onChange={(e) => setFormData({ ...formData, description: e.target.value })}>
                </textarea>
                <label className='checkbox'>
                    <input type='checkbox'
                    checked={formData.is_private}
                    onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}/>
                Private repository
            </label>
            <div className="modal-actions">
              <button onClick={handleCreateRepo}>Create</button>
              <button className="cancel" onClick={onClose}>Cancel</button>
            </div>
                </div>
            </div>
    );
}