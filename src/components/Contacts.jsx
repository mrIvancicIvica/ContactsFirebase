import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/FirebaseContext';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import { child } from 'firebase/database';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Contacts = () => {
  const { ref, get, getDatabase, deleteContact, favContact, updateContact } =
    useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [cellValues, setCellValues] = useState([]);

  const { row } = cellValues;
  console.log('🚀 ~ Contacts ~ row', row)



  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `contacts/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const arrayResult = Object.keys(data).map((con) => {
            return { id: con, name: data[con] };
          });
          setContacts(arrayResult);
          
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [get]);

  const trimContacts = contacts?.map((contact, index) => {
    return {
      id: contact.id,
      lastName: contact.name.lastName,
      firstName: contact.name.name,
      date: contact.name.date,
      favContact: contact.name.favContact,
    };
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 130,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 120,
      editable: true,
    },
    { field: 'date', headerName: 'Date', width: 120, editable: true },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'favorite',
      headerName: 'Favorite',
      width: 90,
      renderCell: (cellValues) => {
        return (
          <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onClick={() => {
                      favContact(cellValues.id);
                    }}
                  />
                }
              />
            </FormGroup>
          </FormControl>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Delete Contact',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Button
            onClick={() => deleteContact(cellValues.id)}
            startIcon={<DeleteIcon />}
          />
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Edit Contact',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Button
            onClick={() => {
              setCellValues(cellValues);
              updateContact(
                cellValues.id,
                row.firstName,
                row.lastName,
                row.date
              );
            }}
            size='small'
          >
            Save
          </Button>
        );
      },
    },
    {
      field: 'vievdetailpage',
      headerName: 'Detail Page',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Link
            style={{ textDecoration: 'none' }}
            to={`/contacts/${cellValues.id}`}
          >
            <Button size='small'>Details</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <Container>
      <div style={{ height: 370, width: '100%', marginTop: 125 }}>
        <DataGrid
          rows={trimContacts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
};

export default Contacts;
