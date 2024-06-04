import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch} from 'react-redux';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:"5px",
};

export default function Confirmation({open,setOpen,title,description,handleClick}) {
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Box sx={{display:'flex',gap:'30px'}}>
            <Button onClick={handleClick} variant='contained' color='success'>Confirm</Button>
            <Button onClick={() => {setOpen(false)}} variant='contained' color='error'>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
