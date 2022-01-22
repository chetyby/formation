import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useHistory } from 'react-router';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BackpackIcon from '@mui/icons-material/Backpack';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { collection, addDoc,getDocs,where,query } from '@firebase/firestore';
import { db } from '../config/firebase-config';





const drawerWidth = 300;
export default function  NavBarBlock() {
  
  let history = useHistory();

  const auth = getAuth();
 
  const [user, setUser] = useState({});
  const [error, setError] = useState({});

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [isAuth, setIsAuth]=React.useState(false)

  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleClick = async (pathname) => { 
     const auth = getAuth();
    if(pathname=='/logout-form')
    {
      try{
          await signOut(auth);
          history.push("/login-form")
      }catch(error){
        console.log(error.code, error.message);
      }

    }else{
      history.push({ pathname });

    }
    setOpen(false);
  }
  const elementsNavBar = [
    
    {nom: 'Gestion des Programmes', icon: <MenuBookRoundedIcon/>, pathname: '/programs'},
    {nom: 'Gestion des Packs', icon: <BackpackIcon/>, pathname: '/packs'},
    {nom: 'Gestion des Sessions', icon: <EventNoteRoundedIcon/>, pathname: '/sessions'},
    {nom: 'Gestion des Formateurs', icon: <SchoolRoundedIcon/>, pathname: '/formers'},
    {nom: 'Logout', icon: <DashboardRoundedIcon/>, pathname: '/logout-form'}
  ];


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
useEffect(() => {
  async function isAuthing() {
    await onAuthStateChanged(auth, async (user) => {
      if (user) {
        let formerData = [];
        let learnerData = [];
        const f = await query(collection(db, "formers"), where("email", "==", user.email));
        const l = await query(collection(db, "learners"), where("email", "==", user.email));
        const former = await getDocs(f);
        const learner = await getDocs(l);
        former.forEach(doc => {
          formerData.push({...doc.data(), id: doc.id});
        })
        learner.forEach(doc => {
          learnerData.push({...doc.data(), id: doc.id});
        })
        if(formerData.length > 0) {
          setUser(...formerData);
        } else {
          setUser(...learnerData);
        }
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    })
  }
  isAuthing();
}, []);


  
  return (
    <>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{fontSize: 17, flexGrow: 1}}>
            Menu APP
          </Typography>
          <Button color='inherit'onClick={()=> handleClick('/register-form')} >{isAuth ? 'Bienvenue':  'Inscription' }</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {elementsNavBar.map((element, index) => (
          <Tooltip key={index} title={element.nom} placement="right">
            <ListItem button onClick={() => handleClick(element.pathname)}>
              <ListItemIcon>
                {element.icon}
              </ListItemIcon>
              <Typography variant={'overline'}>
                 {element.nom}
              </Typography>
            </ListItem>
          </Tooltip>
        ))}
        </List>
        <Divider />
       
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </>
  );
}
