import { useContext, useState } from 'react';
import { UserContext } from '../context/FirebaseContext';
import moment from 'moment';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';


import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string('Enter you ,mail').required('Email is required'),
  lastName: yup.string('Enter you password').required('Password is required'),
});

const SignIn = () => {
  const { addContact, serverTimestamp } = useContext(UserContext);
  const [age, setAge] = useState('');
  const [date, setDate] = useState(new Date('2022-08-18T21:11:54'));

  const navigate = useNavigate();

  const setTime = moment(date).format('DD/MM/YYYY');

  const getTime = (valueDate) => {
    setDate(valueDate);
  };

  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };


  const id = uuid()

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      datePicker: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      getTime(date);
      await addContact(id,values.name, values.lastName, setTime);
      navigate('/contacts');
      resetForm();
    },
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Add Contact
        </Typography>
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            id='name'
            name='name'
            label='Name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin='normal'
            required
            fullWidth
            autoComplete='name'
            autoFocus
          />
          <TextField
            id='lastName'
            name='lastName'
            label='LastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            margin='normal'
            required
            fullWidth
            autoComplete='current-password'
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label='Birthday'
                inputFormat='dd/MM/yyyy'
                value={date}
                onChange={getTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

          <Box sx={{ minWidth: 120, marginTop: 1 }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Add icon</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={age}
                label='Age'
                onChange={handleChangeAge}
              >
                <MenuItem value={'Phone'}>
                  <PhoneIphoneIcon fontSize='small' />
                  Mobile
                </MenuItem>
                <MenuItem value={'Email'}>
                  <EmailIcon fontSize='small' /> Email
                </MenuItem>
                <MenuItem value={'LocalPhone'}>
                  <LocalPhoneIcon fontSize='small' />
                  Local phone{' '}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Add New Contact
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
