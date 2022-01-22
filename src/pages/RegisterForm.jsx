import React, { useEffect, useState } from 'react';
import { Button, TextField, Stack, Paper, Typography, Select, MenuItem, Switch} from "@mui/material";
import {AcUnit } from "@mui/icons-material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { IconButton, InputAdornment, Alert } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useHistory } from 'react-router';
import { collection, addDoc } from '@firebase/firestore';
import { db } from '../config/firebase-config';


export default function RegisterForm() {
  let history = useHistory();
  const auth = getAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState({});


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (props) => (e) => {
    setUser({...user, [props]: e.target.value});
  }

  const createUser = async () => {
    try {
      const formersCollection=collection(db,"formers")
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await addDoc(formersCollection, user);
      console.log(userCredential.user);
      history.push('/login-form');
    } catch(error) {
      if(error.code == 'auth/weak-password') {
        setError({...error, password: 'Le mot de passe doit comporter au moins 6 caractères'});
      } else if(error.code == 'auth/email-already-in-use') {
        setError({...error, email: 'Email dèjà utilisé'});
      }
      console.log(error.code, error.message);
    }
  }

  return (
    <Paper sx={{width: '70%', paddingX: 4, paddingY: 4}} elevation={5}>
      <Stack spacing={1}>
        <AcUnit size={15}/>
        <Typography variant={'overline'}>Page d'Inscription</Typography>
        <Typography variant={'body2'}>
          he Roboto font will not be automatically loaded by MUI. You are responsible for loading any fonts used in your application. Roboto Font has a few easy ways to get started. For more advanced configuration, check out
        </Typography>
        <TextField size="small" label="Nom" variant="outlined"  onChange={handleChange('nom')} helperText="Tappez içi votre nom de famille"/>
        <TextField size="small" label="Prénom" variant="outlined"  onChange={handleChange('prenom')} helperText="Tappez içi votre Prénom"/>
        <TextField size="small" label="Email" variant="outlined"  onChange={handleChange('email')}  helperText="Tappez içi votre email"/>
        <TextField onChange={handleChange('password')} 
        size="small" 
        label="Mot de passe" 
        type={showPassword ? 'text' : 'password'}
        variant="outlined"  
        helperText="Tappez içi votre mot de passe"
        value={user.password}
        InputProps={{
          endAdornment:<InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }}
        />
        <Select 
          size="small" 
          label="Niveau en Informatique" 
          onChange={handleChange('specialisation')}>
          <MenuItem value='Débutant'>Débutant</MenuItem>
          <MenuItem value='Moyen'>Moyen</MenuItem>
          <MenuItem value='Expérimenté'>Expérimenté</MenuItem>
          <MenuItem value='Expert'>Expert</MenuItem>
        </Select>
        <Switch defaultChecked />
        <Stack direction={'row'} spacing={1}>
          <Button variant="contained" startIcon={<AcUnit/>} onClick={createUser}>Créer le compte</Button>
          <Button variant="outlined" endIcon={<AcUnit/>}>Annuler</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}