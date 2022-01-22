import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Stack, Typography, Modal, Box} from "@mui/material";
import {Save} from "@mui/icons-material";
import AddCircle from '@mui/icons-material/AddCircle';
import Create from '@mui/icons-material/Create';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { db } from '../../config/firebase-config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router';

export default function ProgramForm(props) {
  
  const programsCollection = collection(db, "programs");

  let [program, setProgram] = useState(props.program ? props.program : {});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    
  }, []);

  const handleTitleChange = function(e){
    setProgram({...program, title: e.target.value});
  }

  const handleDescriptionChange = function(e){
    setProgram({...program, description: e.target.value});
  }

  const handleGoalChange = function(e){
    setProgram({...program, goal: e.target.value});
  }

  const save = async (id) => {
    setLoading(true);
    if(id) {
      const programDoc = doc(db, "programs", id);
       await updateDoc(programDoc, program);
    } else {
      await addDoc(programsCollection, program);
    }
    setLoading(false);
    setOpen(false);
    props.getPrograms();
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    {props.program ? <IconButton size="small" onClick={handleOpen}>
                  <Create fontSize="inherit" />
                </IconButton>:
                <Button variant="contained" startIcon={<AddCircle/>} onClick={handleOpen}>Ajouter</Button>
    }
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: 500 }}>
        <Typography id="parent-modal-title" variant={'overline'} sx={{ fontSize: 17 }}>
          {props.program ? 'Modifier le programme' : 'Ajout de Nouveaux Programmes'}
        </Typography>
        <p id="parent-modal-description">
          <Stack spacing={1}>
            <Typography variant={'body2'}>
              he Roboto font will not be automatically loaded by MUI. You are responsible for loading any fonts used in your application. Roboto Font has a few easy ways to get started. For more advanced configuration, check out
            </Typography>
            <TextField onChange={handleTitleChange} value={props.program && program.title} size="small" label="Title" variant="outlined"  helperText="Donnez un titre au programme"/>
            <TextField onChange={handleDescriptionChange} value={props.program && program.description} size="small" label="Description" variant="outlined" helperText="Decrivez le programme"/>
            <TextField onChange={handleGoalChange} value={props.program && program.goal} size="small" label="Objectif du Programme" variant="outlined"  helperText="Tappez l'objectif du programme"/>
            <Stack direction={'row'} spacing={1}>
              <LoadingButton
                onClick={() => save(props.program && program.id)}
                endIcon={props.program ? <Save/> : <AddCircleOutlineRoundedIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                color={props.program ? "warning" : "success"}
              >
                {props.program ? 'Modifier' : 'Ajouter'}
              </LoadingButton>
              <Button variant="outlined" onClick={handleClose}>Annuler</Button>
            </Stack>
          </Stack>
        </p>
      </Box>
    </Modal>
    </>
  );
}