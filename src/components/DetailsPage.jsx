import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/FirebaseContext';
import { child } from 'firebase/database';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { ref, get, getDatabase, deleteContact, favContact, updateContact } =
    useContext(UserContext);

  const [contact, setContact] = useState([]);
  console.log('🚀 ~ DetailsPage ~ contact', contact);

  const { id } = useParams();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `contacts/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setContact(data);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [get]);

  return (
    <Container maxWidth='sm'>
      <Box sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {contact.date}
          </Typography>
          <Typography variant='h5' component='div'>
             {contact.name} {contact.lastName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
           id: {contact.id}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => deleteContact(contact.id)} size='small'>Delete</Button>

          <Link style={{textDecoration:'none'}} to={'/contacts'}>
            <Button size='small'> Back to contacts</Button>{' '}
          </Link>
        </CardActions>
      </Box>
    </Container>
  );
};

export default DetailsPage;
