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

    useEffect(() => {
        const currentNoteId = location.pathname.split("/note/")[1];
        setNoteId(currentNoteId);
        getNoteInfo(currentNoteId);
    }, [location]);
      
    const getNoteInfo = async (noteId: string | null) => {
        if (!noteId) {
            return;
        }
        
        try {
            const noteResult = await getNoteByNoteIdFunction({
            variables: {
                noteId: noteId,
            },
            });
            setNote(noteResult.data.getNoteByNoteId);
        } catch (error) {
            console.error(error);
            // 处理错误，可能重定向到错误页面或向用户显示消息
        }
    };

    if(getNoteError){
        if(getNoteError.networkError){
            console.log("Network Error");
            console.log(getNoteError);
            navigate("/login");
        }
    }

    if(getNoteLoading || !note){        
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