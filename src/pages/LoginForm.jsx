import { Button, Paper, Stack, TextField, Typography,RadioGroup,Grid, } from "@mui/material";
import {AcUnit} from "@mui/icons-material";
import {Link} from "@mui/icons-material";
import{blue, grey} from "@mui/material/colors";
import { useHistory } from "react-router";
import React, { useEffect, useState } from 'react';
import { IconButton, InputAdornment, Alert } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {

  // fonction pour faire l'authentification 
  const auth = getAuth();
  // pour naviger entre les pages 
  let history = useHistory();
  // fonction pour modifer les states
  const [user, setUser] = useState({});
  // states des erreurs
  const [error, setError] = useState();
  // fonctione de loading
   const [loading, setLoading] = useState(false);


   // pour gere les cycles de vie de composent 
  useEffect(() => {
    async function isAuthing() {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          history.push('/programs');
        }
      })
    }
    isAuthing();
  }, []);

  const handleChange = (props) => (e) => {
    setUser({...user, [props]: e.target.value});
  }

  const connexion = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
      console.log(userCredential.user);
    } catch(error) {
      setError('Email ou mot de passe invalide!');
      console.log(error.code, error.message);
    }
    setLoading(false);
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



    const gotoregisterpage = function(){
      let target = {
        pathname: '/register-from',
      };
      history.push(target);
    }

    return(
        
        <div>
            <Grid
                container 
                justifyContent="center"
                
            >
        
          <Paper sx={{ p: 2, margin: 20, maxWidth: 500, flexGrow: 1 }} elevation={5} >
          
            <Stack spacing={1} > 
                                    
                <Typography color={blue[800]} variant='button'>Login Page</Typography>
                <Typography color={grey[500]} variant='h8'>Taper votre maile et votre password</Typography>

                <TextField onChange={handleChange('email')} size="small" label="Email" variant="outlined"  helperText="Tappez içi votre email"/>
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
        <Stack direction={'row'} spacing={1}>
          <LoadingButton
            onClick={connexion}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            color="success"
          >
            Connexion
          </LoadingButton>
        </Stack>

            </Stack> 
            <Stack spacing={2} direction={'row'} justifyContent="center">
                    
                </Stack>

                    
                    <Link href="" variant="body2">"Mot de passe oublié ?"</Link>                

          </Paper>
          
         </Grid>
        </div>
       
    );
}