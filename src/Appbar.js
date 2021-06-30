import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';

export default function Appbar() {
  
    return (
      <>
      <AppBar position="relative">
          <Toolbar>
            <Link href="/" variant="h5" color="inherit" >
                Poly Clinic
                </Link>
          </Toolbar>
        </AppBar>
        </>
         );
        }