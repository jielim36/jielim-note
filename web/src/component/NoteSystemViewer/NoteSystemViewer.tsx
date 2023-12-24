import React, { useEffect, useState } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './NoteSystemViewer.css';
import {  Button,  Grid, ListItemIcon, Skeleton, Stack, Typography } from '@mui/material';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { addNoteMutation, deleteNoteMutation, getNoteListQuery } from '../../graphql/Note.Gql';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import Article from '@mui/icons-material/Article';


type noteType = {
  id: string;
  title: string;
}

export const NoteSystemViewer = () => {

    const [openAddNoteForm, setOpenAddNoteForm] = React.useState(false);
    const [newNoteForm, setNewNoteForm] = React.useState({
        name: "",
    });

    const navigate = useNavigate();
    const [addNoteFunction , {data:addNoteResult, loading:addNoteLoading, error:addNoteError}] = useMutation(addNoteMutation);
    const [deleteNoteFunction , {data:deleteNoteResult, loading:deleteNoteLoading, error: deleteNoteError}] = useMutation(deleteNoteMutation);
    const [getNoteListFunction,{ data:getNoteResult, loading:getNoteLoading, error:getNoteError }] = useLazyQuery(getNoteListQuery);
    const [noteList, setNoteList] = useState<noteType[] | null>(null);
    const [openDeleteAlert, setOpenDeleteAlert] = React.useState(true);

    useEffect(()=>{
      const fetchData = async ()=>{
        const data = await getNoteListFunction();
        setNoteList(data.data.listNotesByUser);
      }
      fetchData();
    },[])

    const updateNoteList = async ()=>{      
      const data = await getNoteListFunction();
      setNoteList(data.data.listNotesByUser);
    }

    const handleClickOpenAddNoteForm = () => {
        setOpenAddNoteForm(true);
    };

    const handleCloseAddNoteForm = () => {
        setOpenAddNoteForm(false);
    };

    const handleAddNoteForm = async () => {
      
      if(newNoteForm.name.trim().length < 1){
          throw new Error("Invalid Note Name");
      }

      const newNote = await addNoteFunction({
          variables: {note: {
              title: newNoteForm.name,
              content: "Type something here!"
          }}
      });
      const note: noteType = {
        id: newNote.data.addNote.id , 
        title: newNote.data.addNote.title
      }
      setNoteList((prevNoteList) => {
        if(prevNoteList === null){
          return [note];
        }else{
          return [...prevNoteList , note];
        }
      });

      //after added
      handleCloseAddNoteForm();
      //clear
      setNewNoteForm({
          name: ""
      });
    }

    const handleDeleteNote = async (noteId: String) => {
      console.log(`Delete item for noteId: ${noteId}`);
      const result = await deleteNoteFunction({
        variables: {noteId: noteId}
      })
      if(result){
        updateNoteList();
      }
    };

    const Demo = styled('div')(({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
    }));

    if(getNoteLoading){
      return (
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      );
    }
    
    return (
      <div className='noteViewContainer fadeInAnimation'>
        <Grid item xs={12} md={6}>
        <Stack direction="row" spacing={15} padding={1}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            My Notes
          </Typography>
          <LoadingButton
            size="small"
            onClick={handleClickOpenAddNoteForm}
            endIcon={<AddIcon />}
            loading={addNoteLoading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Add</span>
          </LoadingButton>
        </Stack>
        
        <Demo>
          <List dense={true}>
            {noteList && noteList.map((note)=>{
              return (
                <ListItem
                  key={note.id}
                  className='button'
                  onClick={()=> {navigate(`/note/${note.id}}`)}}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={()=> handleDeleteNote(note.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                <ListItemIcon >
                    <ArticleIcon sx={{ width: 24, height: 24 }}/>
                </ListItemIcon>
                <ListItemText
                  primary={note.title}
                />
              </ListItem>
              )
            })}
          </List>
        </Demo>
      </Grid>

      <React.Fragment>
        <Dialog open={openAddNoteForm} onClose={handleCloseAddNoteForm}>
            <DialogTitle>Add Note</DialogTitle>
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Note Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newNoteForm.name}
                  onChange={(e)=> setNewNoteForm({
                      ...newNoteForm,
                      name: e.target.value,
                  })}
              />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseAddNoteForm}>Cancel</Button>
            <Button onClick={handleAddNoteForm}>Add</Button>
            </DialogActions>
        </Dialog>
      </React.Fragment>
      </div>
    );
};