import React, { useState } from 'react';
import {
    Grid,
    TextField,
    Paper,
    Button,
    Typography,
    Box
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import apiService from '../services/service';

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .email('Enter a valid username')
        .required('username is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
});
export const Login = () => {
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setErrMsg('');
            apiService('login', 'POST', values).then(function (response) {
                if (response && response.access_token) {
                    localStorage.setItem('fin_auth_key', response.access_token);
                    navigate(`/Dashboard`)
                } else {
                    setErrMsg(response.message)
                }
            })       
        },
    });


    return (
        <Box className="login">
            <Paper>

                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        container
                        spacing={2}
                        direction={'column'}
                        justify={'center'}
                        alignItems={'center'}

                    >
                        <Typography variant='h4' spacing={4}>Login</Typography>
                        <Grid item xs={12}>
                            <TextField placeholder='Enter User Name'
                                id="username"
                                name="username"
                                label="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                style={{ 'minWidth': '400px' }}

                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Password" type={'password'} placeholder="Enter Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                style={{ 'minWidth': '400px' }}
                            ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant='contained' type="submit"> Login </Button>
                            <div>
                                {errMsg}
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
