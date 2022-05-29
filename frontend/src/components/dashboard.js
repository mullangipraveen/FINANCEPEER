import React, { useEffect, useState } from 'react'
import Upload from './upload'
import Header from './Header';
import RecordsView from './RecordsView';
import apiService from '../services/service';
import {
    Grid,
    Paper,
} from '@mui/material';
export default function Dashboard() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        loadData();
    },[]);
    const loadData =()=>{
        apiService('getdata','GET').then(function(response){
            setData(response);
        })
    };
    return (
        <Paper>
            <Grid container
                direction={'column'}
                justify={'center'}
            >

                <Grid item xs={12}>
                    <Header />
                </Grid>
                <Grid item xs={12}>
                    <Upload loadData={loadData}/>
                </Grid>
                <Grid item xs={12}>
                    <RecordsView data={data}/>
                </Grid>
            </Grid>

        </Paper>
    )
}
