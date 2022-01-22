import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import PasswordRecoveryForm from "./pages/PasswordRecoveryForm";
import LandingPage from './pages/LandingPage';
import SubscriptionPage from './pages/SubscriptionPage';
import Dashboard from './pages/Dashboard';
import Programmes from './pages/programme';
import NavBarBlock from './pages/NavBarBlock';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Packs from './pages/pack';
import Formers from './pages/Former';
import Sessions from './pages/session';

export default function App() {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    marginBottom: "15px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  return (
    <BrowserRouter>
      <Grid container>
        <Grid item md={1}>
          <NavBarBlock />
        </Grid>
        <Grid item md={11}>
          <DrawerHeader />
          <Switch>
            <Route path='/' component={LoginForm} exact/>
            <Route path='/register-form' component={RegisterForm} exact/>
            <Route path='/dashboard' component={Dashboard} exact/>
            <Route path='/login-form' component={LoginForm} exact/>
         
            <Route path='/password-recovery-form' component={PasswordRecoveryForm} exact/>
            <Route path='/landing-page' component={LandingPage} exact/>
            <Route path='/subscription-page' component={SubscriptionPage} exact/>
            <Route path='/sessions' component={Sessions} exact/>
            <Route path='/programs' component={Programmes} exact/>
            
            <Route path='/packs' component={Packs} exact/>
            <Route path='/formers' component={Formers} exact/>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}