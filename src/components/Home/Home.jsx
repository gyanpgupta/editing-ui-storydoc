import React, { useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconSelectGrid from '../Layout/IconSelectGrid';
import { initialIcons } from '../../utils/InitalIcons';
import { Button, TextField, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const [data, setData] = useState(initialIcons)
  const [openModal, setOpenModal] = useState(false)
  const [selectedGrid, setSelectedGrid] = useState()
  const [edit, setEdit] = useState()
  const [newEditText, setEditText] = useState()

  const handleOpen = (index) => {
    setOpenModal(!openModal)
    setSelectedGrid(index)
  }

  const enableTextEdit = (index) => {
    const editField = {
      id: index,
      isEdit: true
    }
    setEdit(editField)
  }

  const handleTextEdit = (e, index) => {
    setEditText(e.target.value)
  }

  const handleEdit = (e, index) => {
    e.preventDefault()
    if (newEditText) {
      data[index].text = newEditText
      setData([...data])
      setEdit()
      setEditText('')
    }
  }
  const shuffleData = (i, j) => {
    [data[i], data[j]] = [data[j], data[i]];
    setData([...data])
    setEdit()
    setEdit()
    setEditText('')
  }
  const toolText = `1. You can edit the icons, 
  2. You can edit the text,
  3. You can edit the Title,
  4. You can switch the order of the sections`

  return (
    <React.Fragment>
      <h3 className="heading" contenteditable="true">
        Insert the Title here{" "}
      </h3>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {data.map((grid, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} >
              <Item>
                <span style={{ cursor: "pointer" }} onClick={() => handleOpen(index)}>{grid.icon}</span>
                <p style={{ cursor: "pointer" }} onClick={() => enableTextEdit(index)}>{grid.text}</p>
                {edit && edit.id === index && (
                  <React.Fragment>
                    <TextField defaultValue={grid.text} onChange={(e) => handleTextEdit(e, index)} />
                    <Button onClick={(e) => handleEdit(e, index)}>Edit</Button>
                  </React.Fragment>
                )}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      {
        openModal &&
        <IconSelectGrid
          openModal={openModal}
          setOpenModal={setOpenModal}
          setData={setData}
          data={data}
          selectedGrid={selectedGrid}
          setSelectedGrid={setSelectedGrid}
        />
      }

      <Button onClick={() => shuffleData(0, 1)} variant="outlined">Replace first and second</Button>
      <Button onClick={() => shuffleData(1, 2)} variant="outlined">Replace third and second</Button>
      <Button onClick={() => shuffleData(2, 0)} variant="outlined">Replace third and first</Button>


      <div style={{paddingTop: "5px"}}>
        <Tooltip title={toolText}>
          <HelpOutlineIcon />
        </Tooltip>
      </div>
    </React.Fragment >
  )
}

export default Home