import React, { useEffect, useState } from 'react';
import { Stack, Table, TableFooter, TableHead, TableBody, TableRow, TableCell, Paper, Typography} from "@mui/material";
import PackForm from './form';
import DeletePack from './delete';
import { db } from '../../config/firebase-config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Packs() {

  const packsCollection = collection(db, "packs");
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPacks();
  }, []);

  const getProgram = async (id) => {
    const docRef = doc(db, "programs", id);
    let res = await getDoc(docRef);
    return res.data();
  }

  const getPacks = async () => {
    setLoading(true);
    const data = await getDocs(packsCollection);
    
    let packsData = data.docs.map(async (p) => {
      let program = await getProgram(p.data().program);
      return {...p.data(), id: p.id, program}
    });

    let tab = [];
    for(let pack of packsData) {
      tab.push(await pack);
    }
    setPacks(tab);
    setLoading(false);
  }
  
  return (
    <Stack spacing={2}>
      {loading ? 'Loading...' 
      :
      <>
        <PackForm getPacks={getPacks} />
        <Table component={Paper} size={'small'}>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Programme</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              packs.map((item, index) => 
                (
                  <TableRow key={index}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.program?.title}</TableCell>
                    <TableCell>
                      <PackForm pack={item} getPacks={getPacks} />
                    </TableCell>
                    <TableCell>
                      <DeletePack pack={item} getPacks={getPacks} />
                    </TableCell>
                  </TableRow>)
              )
            }
          </TableBody>
          <TableFooter>
            <Typography variant='button' padding={2}>Nombre de pack : {packs.length}</Typography>
          </TableFooter>
        </Table>
      </>
      } 
    </Stack>
  );
}