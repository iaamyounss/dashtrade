import { Fragment } from 'react';
import {Link} from 'react-location';
import Button from '@mui/material/Button';

export default function HeaderNavigation(){
    return (
      <Fragment>
        <Link to="/">
          <Button variant="h6" component="div">
            Dashboard
          </Button>
        </Link>
        <Link to="/admin">
          <Button variant="h6" component="div">
            Admin
          </Button>
        </Link>
      </Fragment>
    )
}