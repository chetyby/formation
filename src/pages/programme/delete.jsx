import { Create, Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import { db } from '../../config/firebase-config';
import { deleteDoc, doc } from 'firebase/firestore';

export default function DeleteProgram(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const deleteProgram = async (id) => {
        setLoading(true);
        const programDoc = doc(db, "programs", id);
        await deleteDoc(programDoc);
        setLoading(false);
        setOpen(false);
        props.getPrograms();
    }

    return (
        <>
        <IconButton size="small" onClick={handleOpen}>
            <Delete fontSize="inherit" />
        </IconButton>

        <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 500 }}>
        <Typography id="parent-modal-title" variant={'overline'} sx={{ fontSize: 14 }}>Voulez vous vraiment supprimer le programme ?!</Typography>
        <p id="parent-modal-description">
            <Stack spacing={1}>
                <Stack direction={'row'} spacing={1}>
                    <LoadingButton
                    color="error"
                    onClick={() => deleteProgram(props.program.id)}
                    endIcon={<DeleteForeverRoundedIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    >
                        Oui
                    </LoadingButton>
                    <Button variant="outlined" onClick={handleClose}>Non</Button>
                </Stack>
            </Stack>
        </p>
        </Box>
        </Modal>
        </>
    );
}