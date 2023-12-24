import React, { useEffect, useState } from 'react'
import './Note.css';
import { useLocation } from 'react-router-dom';

const Note = () => {

    const location = useLocation();
    const [noteId , setNoteId] = useState<string|null>(null);

    useEffect(()=>{
        const getNoteId = () =>{
            const currentNoteIt = location.pathname.split("/note/")[1];
            setNoteId(currentNoteIt);
        }

    },[location]);

    const getNoteInfo = ()=> {
        if(!noteId){
            return;
        }

        

    }

  return (
    <div>
        <p>{location.pathname.split("/note/")[1]}</p>
    </div>
  )
}

export default Note