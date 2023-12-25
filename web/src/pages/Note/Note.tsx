import React, { ChangeEvent, useEffect, useState } from 'react'
import './Note.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { getNoteByNoteIdQuery, updateNoteMutation } from '../../graphql/Note.Gql';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

type NoteType = {
    id: string;
    title: string;
    content: string;
    updated_at?: number;
    readonly created_at?: number;
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
    const [isEdited , setIsEdited] = useState(true); 
    const [getNoteByNoteIdFunction , {data:getNoteResult, loading:getNoteLoading, error:getNoteError}] = useLazyQuery(getNoteByNoteIdQuery);
    const [updateNoteFunction , {data:updateNoteResult, loading:updateNoteLoading, error:updateNoteError}] = useMutation(updateNoteMutation);

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

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(note != null){
            setIsEdited(true);
            setNote({
                ...note,
                title: event.target.value,
            });
        }
    }

    const onChangeContentHandler = (value: string) => {
        if(note != null){
            setIsEdited(true);
            setNote({
                ...note,
                content: value,
            });
        }
    }

    const handleUpdateNote = async () => {
        if(!note){
            return;
        }
        setIsEdited(false);
        // setNote({
        //     ...note,
        //     updated_at: Number(new Date().getTime()),
        // })
        const newNote = await updateNoteFunction({
            variables: {
                note: {
                    id: note.id,
                    title: note.title,
                    content: note.content
                }
            }
        })
        console.log(newNote);
    }

    useEffect(()=>{
        console.log("NOTE:");
        
        console.log(note?.title);
        console.log(note?.content);
        console.log(isEdited);
        
    },[note])


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
        <>
        <div className="note-container">
            {/* <h1>{note.title}</h1>
            <p>{note.content}</p>
            <div className="note-meta">
            {note.updated_at && (
                <p>Last Updated: {new Date(Number(note.created_at)).toLocaleString()}</p>
                )}
                {note.created_at &&  (
                    <p>Created At: {new Date(Number(note.created_at)).toLocaleDateString()}</p>
                    )}
                    {note.author && (
                        <p>Author: {note.author.username}</p>
                        )}
                    </div> */}
            <NoteEditor>
                <input 
                    placeholder='Title' 
                    value={note.title}
                    onChange={onChangeTitleHandler}
                    />
                <ReactQuill 
                    placeholder='Start writting here' 
                    value={note.content}
                    onChange={onChangeContentHandler}
                    />
            </NoteEditor>
        </div>
        <div className='noteInfo'>
            <h2 className='noteInfoTitle'>Note Info</h2>
            <p className="info-item" id="author_username">Author: {note.author?.username}</p>
            <p className="info-item" id="updated_at">Updated at: {new Date(Number(note.updated_at)).toLocaleDateString()}</p>
            <p className="info-item" id="created_at">Created at: {new Date(Number(note.created_at)).toLocaleDateString()}</p>
            
            <Button 
                variant="contained" 
                endIcon={<SaveIcon />} 
                disabled={!isEdited}
                onClick={handleUpdateNote}
                className='saveBtn'
            >
                Save
            </Button>
        </div>
        </>
    )
}

const NoteEditor = styled.div`
    >input {
        border: none;
        outline: none;
        padding: 18px;
        font-size: 2em;
        width: 100%;
    }

    .ql-toolbar,
    .ql-container {
        border: none !important;
    }

    .quill, .ql_container {
        font-size: 1em;
    }
`;


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