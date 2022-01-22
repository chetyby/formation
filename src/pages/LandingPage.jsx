import React from 'react';

import { Button, Container, Stack, Paper, Typography, Select, CardActions, Card, CardHeader, Avatar, CardMedia, CardContent, CardActionArea} from "@mui/material";

import {purple, orange} from '@mui/material/colors';

import { useHistory } from 'react-router';

export default function LandingPage() {
  let history = useHistory();

  const gotoBronze = function(){
    let target = {
      pathname: '/subscription-page',
      data:{
        pack: 'BRONZE',
        price: 10,
      },
    };
    history.push(target);
  }

  const gotoSilver = function(){
    let target = {
      pathname: '/subscription-page',
      data:{
        pack: 'SILVER',
        price: 100,
      },
    };
    history.push(target);
  }

  const gotoGold = function(){
    let target = {
      pathname: '/subscription-page',
      data:{
        pack: 'GOLD',
        price: 1000,
      },
    };
    history.push(target);
  }

  return (
    <Container maxWidth={'lg'}>

      <Stack direction={'row'} spacing={1}>
        
        <Card>
          <CardHeader avatar={<Avatar variant="rounded">S</Avatar>} title={'Pack Silver'} subheader={'Pack destinée aux débutants'}/>
          <CardMedia height="194" image={null} alt="Paella dish"/>
          <CardContent>
            <Typography variant="body2">
              This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            <Typography variant="h4">10 USD</Typography>
          </CardContent>
          <CardActions>
            <Stack direction={'row'} spacing={1}>
              <Button variant="contained" onClick={gotoBronze}>S'inscrire</Button>
              <Button variant="link">Syllabus</Button>
            </Stack>
          </CardActions>
        </Card>
        
        <Card>
          <CardHeader avatar={<Avatar sx={{bgcolor: purple[600]}} variant="rounded">G</Avatar>} title={'Pack Gold'} subheader={'Pack destinée aux débutants'}/>
          <CardMedia height="194" image={null} alt="Paella dish"/>
          <CardContent>
            <Typography variant="body2">
              This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            <Typography variant="h4">50 USD</Typography>
          </CardContent>
          <CardActions>
            <Stack direction={'row'} spacing={1}>
              <Button variant="contained" onClick={gotoSilver}>S'inscrire</Button>
              <Button variant="link">Syllabus</Button>
            </Stack>
          </CardActions>
        </Card>

        <Card>
          <CardHeader avatar={<Avatar sx={{bgcolor: orange[700]}} variant="rounded">B</Avatar>} title={'Pack Platinium'} subheader={'Pack destinée aux débutants'}/>
          <CardMedia height="194" image={null} alt="Paella dish"/>
          <CardContent>
            <Typography variant="body2">
              This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            <Typography variant="h4">100 USD</Typography>
          </CardContent>
          <CardActions>
            <Stack direction={'row'} spacing={1}>
              <Button variant="contained" onClick={gotoGold}>S'inscrire</Button>
              <Button variant="link">Syllabus</Button>
            </Stack>
          </CardActions>
        </Card>

      </Stack>
    </Container>
  );
}