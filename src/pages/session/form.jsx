import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Stack, Typography, Modal, Box, InputLabel, MenuItem, Select, FormHelperText } from "@mui/material";
import {Save} from "@mui/icons-material";
import AddCircle from '@mui/icons-material/AddCircle';
import Create from '@mui/icons-material/Create';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { db } from '../../config/firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import LoadingButton from '@mui/lab/LoadingButton';

export default function SessionForm(props) {
  
  const sessionsCollection = collection(db, "sessions");
  const programsCollection = collection(db, "programs");

  const [session, setSession] = useState(props.session ? props.session : {});
  const [programs, setPrograms] = useState([]);
  const [program, setProgram] = useState(props.program ? props.program : {});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const getPrograms = async () => {
    setLoading(true);
    const data = await getDocs(programsCollection);
    setLoading(false);
    setPrograms(data.docs.map((d) => (
      {id: d.id, ...d.data()}
      ))
    );
  }

  useEffect(() => {
    getPrograms();
  }, []);
  const handleProgramChange = function(e){
    setProgram(e.target.value);
    setSession({...session, program: e.target.value.id});
  }
  
  const handleStartDateChange = function(e){
    setSession({...session, startDate: e.target.value});
  }

  const handlefinDateChange = function(e){
    setProgram(e.target.value);
    setSession({...session, finDate: e.target.value});
  }

  const labels = ['Gold', 'Silver', 'Bronze'];
  
  const save = async (id) => {
    setLoading(true);
    if(id) {
      const sessionDoc = doc(db, "sessions", id);
      await updateDoc(sessionDoc, session);
    } else {
      await addDoc(sessionsCollection, session);
    }
    setLoading(false);
    setOpen(false);
    props.getSessions();
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
    {props.session ? <IconButton size="small" onClick={handleOpen}>
                  <Create fontSize="inherit" />
                </IconButton>:
                <Button variant="contained" startIcon={<AddCircle/>} onClick={handleOpen}>Ajouter</Button>
    }
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: 500 }}>
        <Typography id="parent-modal-title" variant={'overline'} sx={{ fontSize: 17 }}>
          {props.session ? 'Modifier la session': 'Ajout de Nouveaux sessions'}
        </Typography>
        <p id="parent-modal-description">
          <Stack spacing={1}>
            <Typography variant={'body2'}>
              he Roboto font will not be automatically loaded by MUI. You are responsible for loading any fonts used in your application. Roboto Font has a few easy ways to get started. For more advanced configuration, check out
            </Typography>

            

            <TextField 
            id="date"
            label=""
            type="date" 
            onChange={handleStartDateChange} 
            value={props.session && props.session.startDate} 
            size="small" variant="outlined" 
            helperText="Ecrivez la date debute du Session"
            />
            <TextField 
            id="date"
            label=""
            type="date" 
            onChange={handlefinDateChange} 
            value={props.session && props.session.finDate} 
            size="small" variant="outlined" 
            helperText="Ecrivez la date fin du Session"
            />
            
            <InputLabel id="demo-simple-select-label">Programme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={program && program.title}
              label="Programme"
              onChange={handleProgramChange}
            >
              {programs.map((item, index) => (
                <MenuItem key={index} value={item}>{item.title}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Choisissez le programme</FormHelperText>

            <Stack direction={'row'} spacing={1}>
              <LoadingButton
                onClick={() => save(props.session && session.id)}
                endIcon={props.session ? <Save/> : <AddCircleOutlineRoundedIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                color={props.session ? "warning" : "success"}
              >
                {props.session ? 'Modifier' : 'Ajouter'}
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