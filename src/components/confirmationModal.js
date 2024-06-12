import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  textAlign: 'center'  // Centering the content
};

export default function Confirmation({ open, setOpen, title, description, handleClick, confirmText = "Confirm", cancelText = "Cancel" }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '30px', mt: 2 }}>
            <Button
              onClick={handleClick}
              variant="contained"
              color="success"
              aria-label="confirm"
            >
              {confirmText}
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
              aria-label="cancel"
            >
              {cancelText}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
