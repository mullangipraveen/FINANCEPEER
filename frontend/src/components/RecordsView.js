import React from 'react'
import {TableContainer, Table, TableBody, TableCell, TableHead, TableRow,Paper } from '@mui/material'


export default function RecordsView({data}) {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>UserId</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Body</TableCell>
                </TableRow>
               
            </TableHead>
            <TableBody>
           
              {data.map((item,index)=>{
                return <TableRow key={index}>
                     <TableCell>{item.id}</TableCell>
                    <TableCell>{item.userId}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.body}</TableCell>
                </TableRow>
              })}
           
            
            </TableBody>
        </Table>

    </TableContainer>
  )
}
