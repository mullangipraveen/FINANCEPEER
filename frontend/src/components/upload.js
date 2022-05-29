import { TextField, Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import apiService from '../services/service';

export default function Upload({loadData}) {
    const [selectedFile, setSelectedFile] = useState('');
    const [uploadStatus,setUploadStatus] = useState('');
    const onFileChange = event => {
        setSelectedFile(event.target.files[0])
        const formData = new FormData();
        formData.append(
            "file",
            event.target.files[0],
            event.target.files[0].name
        );
        apiService('upload','POST',formData,true).then(function(response){
            loadData();
            setUploadStatus(response.message);
            setSelectedFile('')       

        })      
    };
    return (
        <Grid justify={'center'}
            alignItems={'center'}>
            <Button
                variant="contained"
                component="label"
            >
                Select File To Upload  <input
                    accept="application/JSON"
                    onChange={(e) => onFileChange(e)}
                    type="file"
                    hidden
                />
            </Button>
            {uploadStatus}
            {/* Select File Name : {selectedFile ? selectedFile.name : ''} Size :  {selectedFile ? (Math.round(selectedFile.size / 1024, 1)) + 'KB' : ''} */}
        </Grid>
    )
}
