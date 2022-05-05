import React, { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { iconData } from '../../utils/AllIcons';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

export default function IconSelectGrid({ openModal, setOpenModal, setData, data, selectedGrid, setSelectedGrid }) {
  const [open, setOpen] = useState(openModal)
  const [editSeletedIcon, setEditSelectedIcon] = useState()

  const handleClose = () => {
    setOpen(false)
  }
  const handleSelectIcon = (e) => {
    setEditSelectedIcon(e)
  }
  const handleEdit = () => {
    
    data[selectedGrid].icon = iconData[editSeletedIcon]
    setData([...data])
    handleClose()
  }
  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box sx={{ ...style, width: 200 }}>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {iconData.map((icon, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item style={{borderStyle: "solid",borderColor: `${editSeletedIcon===index ? 'coral': ''}`}} onClick={() => handleSelectIcon(index)}>{icon}</Item>
            </Grid>
          ))}
        </Grid>
        <Button onClick={() => handleEdit()}>Select</Button>
        <Button onClick={() => handleClose()}>Cancel</Button>
      </Box>
    </Modal>
  );
}