import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Stack, Typography, Modal, Box, InputLabel, MenuItem,
  Select, FormHelperText } from "@mui/material";
import {Save} from "@mui/icons-material";
import AddCircle from '@mui/icons-material/AddCircle';
import Create from '@mui/icons-material/Create';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { db } from '../../config/firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import LoadingButton from '@mui/lab/LoadingButton';

export default function PackForm(props) {
  
  const packsCollection = collection(db, "packs");
  const programsCollection = collection(db, "programs");

  let [pack, setPack] = useState(props.pack ? props.pack : {});
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

  const handleLabelChange = function(e){
    setPack({...pack, label: e.target.value});
  }

  const handlePrixChange = function(e){
    setPack({...pack, price: e.target.value});
  }

  const handleProgramChange = function(e){
    setProgram(e.target.value);
    setPack({...pack, program: e.target.value.id});
  }

  const labels = ['Gold', 'Silver', 'Bronze'];
  
  const save = async (id) => {
    setLoading(true);
    if(id) {
      const packDoc = doc(db, "packs", id);
      await updateDoc(packDoc, pack);
    } else {
      await addDoc(packsCollection, pack);
    }
    setLoading(false);
    setOpen(false);
    props.getPacks();
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
    {props.pack ? <IconButton size="small" onClick={handleOpen}>
                  <Create fontSize="inherit" />
                </IconButton>:
                <Button variant="contained" startIcon={<AddCircle/>} onClick={handleOpen}>Ajouter</Button>
    }
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...style, width: 500 }}>
        <Typography id="parent-modal-title" variant={'overline'} sx={{ fontSize: 17 }}>
          {props.pack ? 'Modifier le pack': 'Ajout de Nouveaux packs'}
        </Typography>
        <p id="parent-modal-description">
          <Stack spacing={1}>
            <Typography variant={'body2'}>
              he Roboto font will not be automatically loaded by MUI. You are responsible for loading any fonts used in your application. Roboto Font has a few easy ways to get started. For more advanced configuration, check out
            </Typography>

            <InputLabel id="demo-simple-select-label">Label</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pack.label}
              label="Label"
              onChange={handleLabelChange}
            >
              {labels.map((label, index) => (
                <MenuItem key={index} value={label}>{label}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Choisissez un label du pack</FormHelperText>

            <TextField onChange={handlePrixChange} value={props.pack && pack.description} size="small" label="Prix" variant="outlined" helperText="Ecrivez le prix du Pack"/>
            
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
                onClick={() => save(props.pack && pack.id)}
                endIcon={props.pack ? <Save/> : <AddCircleOutlineRoundedIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                color={props.pack ? "warning" : "success"}
              >
                {props.pack ? 'Modifier' : 'Ajouter'}
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