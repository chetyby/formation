import React, { useEffect, useState } from 'react';
import { Button, Stack, Table, TableFooter, TableHead, TableBody, TableRow, TableCell, Paper, Typography} from "@mui/material";
import ProgramForm from './form';
import DeleteProgram from './delete';
import { db } from '../../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

function Line(props){
  
  return(
    <TableRow>
      <TableCell>{props.element.title}</TableCell>
      <TableCell>{props.element.description}</TableCell>
      <TableCell>{props.element.goal}</TableCell>
      <TableCell>
        <ProgramForm program={props.element} getPrograms={props.parentCallback} />
      </TableCell>
      <TableCell>
        <DeleteProgram program={props.element} getPrograms={props.parentCallback} />
      </TableCell>
    </TableRow>
  );
}

export default function Programmes() {

  const programsCollection = collection(db, "programs");
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

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
    console.log(programsCollection)
    getPrograms();
  }, []);

  return (
    <Stack spacing={2}>
      {loading ? 'Loading...' 
      :
      <>
        <ProgramForm getPrograms={getPrograms} />
        <Table component={Paper} size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Objectif</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              programs.map(function(item){
                return(<Line key={item.id} element={item} parentCallback={getPrograms}/>);
              })
            }
          </TableBody>
          <TableFooter>
            <Typography variant='button' padding={2}>Nombre de Programme : {programs.length}</Typography>
          </TableFooter>
        </Table>
      </>
      } 
    </Stack>
  );
}