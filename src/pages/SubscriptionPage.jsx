import React from 'react';

import { Button, Container, TextField, Stack, Paper, Typography, Select, CardActions, Card, CardHeader, Avatar, CardMedia, CardContent, CardActionArea} from "@mui/material";

import {purple, orange} from '@mui/material/colors';

import {AcUnit } from "@mui/icons-material";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { useLocation } from 'react-router';

export default function SubscriptionPage() {
  let [currentStep, setCurrentStep] = React.useState(0);

  let location = useLocation();

  let pack = location.data.pack;
  let price = location.data.price;

  const nextStep = function(event){
    setCurrentStep(currentStep +1);
  }

  const goBack = function(event){
    setCurrentStep(currentStep - 1);
  }

  return (

    <Container maxWidth={'lg'}>
      <Stepper activeStep={currentStep} orientation="vertical">


        
        <Step key={'stepA'}>
          <StepLabel>Informations Personnelles </StepLabel>
          <StepContent>
            <Stack direction={'column'} spacing={5}>
              <Stack direction={'column'} spacing={1}>
                <Typography>
                  Vous avez choisi le pack {pack} qui coute {price} USD. Merci de ....
                </Typography>
                <TextField size="small" label="Nom" variant="outlined"  helperText="Tappez içi votre nom de famille"/>
                <TextField size="small" label="Prénom" variant="outlined"  helperText="Tappez içi votre prénom"/>
                <TextField size="small" label="Email" variant="outlined"  helperText="Tappez içi votre email"/>
                <TextField size="small" label="Téléphone" variant="outlined"  helperText="Tappez içi votre téléphone"/>
              </Stack>
              <Button variant="contained" onClick={nextStep}>Suivant</Button>
            </Stack>
          </StepContent>
        </Step>

          <Step key={'stepB'}>
            <StepLabel>Conditions d'Utilisation</StepLabel>
            <StepContent>
              <Typography>
                Merci de saisir vos infirmations personnelles pour ...
              </Typography>
              <Stack direction={'row'} spacing={1}>
                <Button variant="contained" onClick={nextStep}>Suivant</Button>
                <Button variant="link" onClick={goBack}>Revenir</Button>
              </Stack>
            </StepContent>
          </Step>
     
          <Step key={'stepC'}>
            <StepLabel>Niveau en Informatique</StepLabel>
            <StepContent>
              <Typography>
                Merci de saisir vos infirmations personnelles pour ...
              </Typography>
              <Stack direction={'row'} spacing={1}>
                <Button variant="contained" onClick={nextStep}>Suivant</Button>
                <Button variant="link" onClick={goBack}>Revenir</Button>
              </Stack>
            </StepContent>
          </Step>

          <Step key={'stepC'}>
            <StepLabel>Paiement</StepLabel>
            <StepContent>
              <Stack direction={'column'} spacing={5}>
                <Stack direction={'column'} spacing={1}>
                  <Typography>
                    Merci de saisir vos infirmations personnelles pour ...
                  </Typography>
                  <TextField size="small" label="Code de Carte" variant="outlined"/>
                  <TextField size="small" label="Nom et Prénom" variant="outlined"/>
                  <TextField size="small" label="Date d'Expiration" variant="outlined"/>
                  <TextField size="small" label="Cryptogramme" variant="outlined"/>
                </Stack>
                <Stack direction={'row'} spacing={1}>
                  <Button variant="contained" onClick={nextStep}>Effectuer le Paiement</Button>
                  <Button variant="link" onClick={goBack}>Revenir</Button>
                </Stack>
              </Stack>
            </StepContent>
          </Step>

      </Stepper>
    </Container>
  );
}