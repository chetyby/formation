import React, { useEffect, useState } from 'react';
import { Button, Stack, Table, TableFooter, TableHead, TableBody, TableRow, TableCell, Paper, Typography} from "@mui/material";
import { db } from '../../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function Line(props){
  
  return(
    <TableRow>
      <TableCell>{props.element.nom}</TableCell>
      <TableCell>{props.element.prenom}</TableCell>
      <TableCell>{props.element.email}</TableCell>
      <TableCell>{props.element.specialisation}</TableCell>
    </TableRow>
  );
}

export default function Formers() {

  const formersCollection = collection(db, "formers");
  const [formers, setFormers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFormers = async () => {
    setLoading(true);
    const data = await getDocs(formersCollection);
    setLoading(false);
    setFormers(data.docs.map((d) => (
      {id: d.id, ...d.data()}
      ))
    );
  }
  
  useEffect(() => {
    console.log(formersCollection)
    getFormers();
  }, []);

  return (
    <Stack spacing={2}>
      {loading ? 'Loading...' 
      :
      <>
        <Table component={Paper} size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prenom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>specialisation</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              formers.map(function(item){
                return(<Line key={item.id} element={item} parentCallback={getFormers}/>);
              })
            }
          </TableBody>
          <TableFooter>
            <Typography variant='button' padding={2}>Nombre de Programme : {formers.length}</Typography>
          </TableFooter>
        </Table>
      </>
      } 
    </Stack>
  );
}