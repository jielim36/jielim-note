import React, { useEffect, useState } from 'react'
import './Note.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { getNoteByNoteIdQuery } from '../../graphql/Note.Gql';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

type NoteType = {
    id: string;
    title: string;
    content: string;
    updated_at?: Date;
    created_at?: Date;
    author?: {
      id: string;
      email: string;
      username: string;
    };
};
  

const Note = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [noteId , setNoteId] = useState<string|null>(null);
    const [note, setNote] = useState<NoteType|null>(null);
    const [getNoteByNoteIdFunction , {data:getNoteResult, loading:getNoteLoading, error:getNoteError}] = useLazyQuery(getNoteByNoteIdQuery);

    useEffect(()=>{
        const getNoteId = () =>{
            const currentNoteIt = location.pathname.split("/note/")[1];
            setNoteId(currentNoteIt);
        }
        getNoteId();
        getNoteInfo();

    },[location]);

    const getNoteInfo = async ()=> {        
        if(!noteId){
            return;
        }
        
        const noteResult = await getNoteByNoteIdFunction({
            variables: {
                noteId: noteId
            }
        })
        setNote(noteResult.data.getNoteByNoteId);
    }

    if(getNoteError){
        if(getNoteError.networkError){
            console.log("Network Error");
            console.log(getNoteError);
            navigate("/login");
        }
    }

    if(getNoteLoading || !note){
        console.log(note);
        
        return (
            <SkeletonTypography />
        );
    }

    return (
        <div className="note-container">
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <div className="note-meta">
                {note.updated_at && (
                <p>Last Updated: {new Date(note.updated_at).toLocaleString()}</p>
                )}
                {note.created_at && (
                <p>Created At: {new Date(note.created_at).toLocaleString()}</p>
                )}
                {note.author && (
                <p>Author: {note.author.username}</p>
                )}
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
                <p>s</p>
        
    
            </div>
        </div>
    )
}


const variants = [
    'h1',
    'h3',
    'body1',
    'caption',
] as readonly TypographyProps['variant'][];

function TypographyDemo(props: { loading?: boolean }) {
    const { loading = false } = props;

    return (
        <div>
        {variants.map((variant) => (
            <Typography component="div" key={variant} variant={variant}>
            {loading ? <Skeleton /> : variant}
            </Typography>
        ))}
        </div>
    );
}

export function SkeletonTypography() {
return (
    <Grid container spacing={8}>
    <Grid item xs>
        <TypographyDemo loading />
    </Grid>
    </Grid>
);
}

export default Note