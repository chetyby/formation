import React, { useEffect, useState } from 'react';
import { Stack, Table, TableFooter, TableHead, TableBody, TableRow, TableCell, Paper, Typography} from "@mui/material";
import SessionForm from './form';
import DeletePack from './delete';
import { db } from '../../config/firebase-config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Sessions() {

  const sessionsCollection = collection(db, "sessions");
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions();
  }, []);

  const getProgram = async (id) => {
    const docRef = doc(db, "programs", id);
    let res = await getDoc(docRef);
    return res.data();
  }

  const getSessions = async () => {
    setLoading(true);
    const data = await getDocs(sessionsCollection);
    
    let sessionsData = data.docs.map(async (p) => {
      let program = await getProgram(p.data().program);
      return {...p.data(), id: p.id, program}
    });

    let tab = [];
    for(let session of sessionsData) {
      tab.push(await session);
    }
    setSessions(tab);
    setLoading(false);
  }
  
  return (
    <Stack spacing={2}>
      {loading ? 'Loading...' 
      :
      <>
        <SessionForm getSessions={getSessions} />
        <Table component={Paper} size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell>date debute</TableCell>
              <TableCell>date fin</TableCell>
              <TableCell>Programme</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              sessions.map((item, index) => 
                (
                  <TableRow key={index}>
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.finDate}</TableCell>
                    <TableCell>{item.program?.title}</TableCell>
                    <TableCell>
                      <SessionForm session={item} getSessions={getSessions} />
                    </TableCell>
                    <TableCell>
                      <DeletePack session={item} getSessions={getSessions} />
                    </TableCell>
                  </TableRow>)
              )
            }
          </TableBody>
          <TableFooter>
            <Typography variant='button' padding={2}>Nombre de session : {sessions.length}</Typography>
          </TableFooter>
        </Table>
      </>
      } 
    </Stack>
  );
}