import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function HeaderAdminNavigation(){
    return (
      <Fragment>
        <Link to="wallet">
          <Button variant="h6" component="div">
            Wallet
          </Button>
        </Link>
      </Fragment>
    )
}