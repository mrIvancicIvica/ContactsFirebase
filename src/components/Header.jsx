// import { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { auth } from '../firebase/firebase-config';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const [user, setUser] = useState();

//   const logout = async () => {
//     await signOut(auth);
//   };

//   onAuthStateChanged(auth, (currentUser) => {
//     setUser(currentUser);
//   });
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position='static'>
//         <Toolbar>
//           <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
//             <Link
//               style={{ color: 'white', textDecoration: 'none' }}
//               to={'/contacts'}
//             >
//               Contacts
//             </Link>
//           </Typography>
//           {user?.email ? (
//             <Button onClick={logout} color='inherit'>
//               Logout
//             </Button>

//           ) : null}
//           {user?.email}
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Header;

import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/FirebaseContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { auth } from '../firebase/firebase-config';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link
              style={{ color: 'white', textDecoration: 'none' }}
              to={'/contacts'}
            >
              Contacts
            </Link>
          </Typography>

          <Link style={{ textDecoration: 'none' }} to={'/addcontact'}>
            <Button> Add Contact</Button>
          </Link>
          {user && (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{user.email}</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
