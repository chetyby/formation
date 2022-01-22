import React from 'react';

import { Button, TextField, Stack, Paper, Typography, Select, MenuItem, Switch} from "@mui/material";

import {AcUnit } from "@mui/icons-material";

export default function PasswordRecoveryForm() {
  return (
    <Paper sx={{width: '24%', paddingX: 4, paddingY: 4}} elevation={5}>
      <Stack spacing={1}>
        <AcUnit size={15}/>
        <Typography variant={'overline'}>PasswordRecoveryForm</Typography>
        <Typography variant={'body2'}>
          he Roboto font will not be automatically loaded by MUI. You are responsible for loading any fonts used in your application. Roboto Font has a few easy ways to get started. For more advanced configuration, check out
        </Typography>
        <TextField size="small" label="Nom" variant="outlined"  helperText="Tappez içi votre nom de famille"/>
        <Stack direction={'row'} spacing={1}>
          <Button variant="contained" startIcon={<AcUnit/>}>Récuperer le mot de passe</Button>
          <Button variant="outlined" endIcon={<AcUnit/>}>Annuler</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}