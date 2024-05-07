import React from 'react'
import { Container,Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SideBar from './sidebar';
import DataTable  from '../components/datagrid'

const AllItems = () => {
  const columns = [
    { field: "id", headerName: "ID", flex: 10 },
    { field: "firstName", headerName: "First Name", flex: 15 },
    { field: "lastName", headerName: "Last Name", flex: 15 },
    { field: "age", headerName: "Age", type: "number", flex: 10 },
    { field: "email", headerName: "Email", flex: 30 },
    {
      field: "action",
      eaderName: "Action",
      flex: 20,
      renderCell: (params) => {
        return (
          <Box sx={{ gap: "20px" }}>
            <IconButton color="success" aria-label="add to shopping cart">
              <EditIcon />
            </IconButton>
            <IconButton color="error" aria-label="add to shopping cart">
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  
  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      email: "jon@example.com",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      email: "cersei@example.com",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      email: "jaime@example.com",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      email: "arya@example.com",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      email: "daenerys@example.com",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      email: "melisandre@example.com",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      email: "ferrara@example.com",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      email: "rossini@example.com",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      email: "harvey@example.com",
    },
  ];
  return (
    <Box sx={{display:'flex'}}>
    <SideBar/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
      <Container  maxWidth>
          <Box>
              <DataTable columns={columns} rows={rows}/>
          </Box>
      </Container>
      </Box>
    </Box>
  )
}

export default AllItems;