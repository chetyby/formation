import React from 'react';
import {ListItemIcon, Switch, Button, ListItemText,ListItem, List, Container, Grid,  Drawer, Table, TableFooter, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Select, CardActions, Card, CardHeader, Avatar, CardMedia, CardContent, CardActionArea} from "@mui/material";
import {purple, orange, green} from '@mui/material/colors';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AddchartIcon from '@mui/icons-material/Addchart';
import NavBarBlock from './NavBarBlock';
import {useHistory} from 'react-router';
import ProgramDashboard from './dashboard/ProgramDashboard';

export default function Dashboard() {

  let history = useHistory();

  let list = [
    {
      "firstName": "ABEBRT",
      "lastName": "ABEBRT",
      "email": "ABEBRT",
      "phone": "ABEBRT",
      "program": "ABEBRT",
      "session": "ABEBRT",
      "level": "ABEBRT",
    },
    {
      "firstName": "ABEBRT",
      "lastName": "ABEBRT",
      "email": "ABEBRT",
      "phone": "ABEBRT",
      "program": "ABEBRT",
      "session": "ABEBRT",
      "level": "ABEBRT",
    },
    {
      "firstName": "ABEBRT",
      "lastName": "ABEBRT",
      "email": "ABEBRT",
      "phone": "ABEBRT",
      "program": "ABEBRT",
      "session": "ABEBRT",
      "level": "ABEBRT",
    },
    {
      "firstName": "ABEBRT",
      "lastName": "ABEBRT",
      "email": "ABEBRT",
      "phone": "ABEBRT",
      "program": "ABEBRT",
      "session": "ABEBRT",
      "level": "ABEBRT",
    },
  ];

  let programs = [
    {
      "id": 12,
      "title": "Intelligence Artificielle",
      "description": "  neiv eeifvjeoipv ij,vio",
      "goal": "Former des Développeurs IA",
      "url": '../../ia.jpg'
    },
    {
      "id": 1542,
      "title": "Sciences de Données",
      "description": "  neiv eeifvjeoipv ij,vio",
      "goal": "Former des Data Scientists",
      "url": '../../ds.jpg'
    },
    {
      "id": 8542,
      "title": "Marketing Digital ",
      "description": "  neiv eeifvjeoipv ij,vio",
      "goal": "Former des Web Marketers",
      "url": '../../md.jpg'
    },
  ]

  return (
          <Grid container item md={10}>
            <Grid item xs={12} md={4}>
              <Card sx={{backgroundColor: purple[600], color: purple[50]}}>
                <CardHeader avatar={<Avatar sx={{bgcolor: purple[200]}} variant="rounded"><AddRoadIcon/></Avatar>} title={'Pack Platinium'} action={<AddRoadIcon/>}/>
                <CardMedia height="194" image={null} alt="Paella dish"/>
                <CardContent>
                  <Typography variant="body2">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. 
                  </Typography>
                  <Typography variant="h4">100 USD</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{backgroundColor: green[600], color: green[50]}}>
                <CardHeader avatar={<Avatar sx={{bgcolor: orange[700]}} variant="rounded">B</Avatar>} title={'Pack Platinium'} subheader={'Pack destinée aux débutants'}/>
                <CardMedia height="194" image={null} alt="Paella dish"/>
                <CardContent>
                  <Typography variant="body2">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                  <Typography variant="h4">100 USD</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader avatar={<Avatar sx={{bgcolor: orange[700]}} variant="rounded">B</Avatar>} title={'Pack Platinium'} subheader={'Pack destinée aux débutants'}/>
                <CardMedia height="194" image={null} alt="Paella dish"/>
                <CardContent>
                  <Typography variant="body2">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                  <Typography variant="h4">100 USD</Typography>
                </CardContent>
              </Card>
            </Grid>
          
            <Grid item xs={8}>
              <Table component={Paper} size={'small'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Téléphone</TableCell>
                    <TableCell>Programme</TableCell>
                    <TableCell>Session</TableCell>
                    <TableCell>Niveau</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {
                    list.map(function(item, i){
                      return(
                        <TableRow key={i}>
                          <TableCell>{item.firstName}</TableCell>
                          <TableCell>{item.lastName}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.phone}</TableCell>
                          <TableCell>{item.program}</TableCell>
                          <TableCell>{item.session}</TableCell>
                          <TableCell><Switch/></TableCell>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>

                <TableFooter>
                  <Typography variant='body2'>Nombre d'inscrits : {list.length}</Typography>
                </TableFooter>
              </Table>
            </Grid>

            <Grid item md={4}>
              <List>
                {programs.map((program) => <ProgramDashboard key={program.id} program={program} />)}
              </List>
            </Grid>
          </Grid>
  );
}