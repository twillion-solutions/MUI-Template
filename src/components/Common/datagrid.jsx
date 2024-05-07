import { Container,Box,Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const DataTable = ({columns,rows}) => {
  return (
    <Container maxWidth='md'>
        <Box sx={{padding:'10px'}}>
            <Paper>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                />
            </Paper>
        </Box>
    </Container>
  )
}

export default DataTable