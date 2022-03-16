import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import makeStyles from '@mui/styles/makeStyles'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuth } from 'context/utils/AuthContext'
import { useImmer } from 'use-immer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '330px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  dialog: {
    opacity: '0.9',
  },
}))

const LoginForm = ({ create = false, setError }) => {
  const { signup, login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [{ email, password, confirmedPassword }, setUser] = useImmer({
    email: '',
    password: '',
    confirmedPassword: '',
  })

  const classes = useStyles()
  const label = create ? 'Inscrivez-vous' : 'Connexion'

  async function register() {
    if (!email) return setError('Vous devez entrer une adresse mail.')
    if (!password) return setError('Vous devez entrer un mot de passe.')
    if (!confirmedPassword && create)
      return setError('Vous devez confirmer votre mot de passe.')
    if (password !== confirmedPassword) {
      return setError('Les mots de passe ne correspondent pas.')
    }

    try {
      setError('')
      setLoading(true)
      await signup(email, password)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  async function connect() {
    if (!email) return setError('Vous devez entrer une adresse mail.')
    if (!password) return setError('Vous devez entrer un mot de passe.')

    try {
      setError('')
      setLoading(true)
      await login(email, password)
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <form className={classes.root} noValidate>
      <TextField
        id='filled-basic'
        label='Email'
        variant='filled'
        color='secondary'
        autoComplete='off'
        required
        value={email}
        onChange={e =>
          setUser(draft => {
            draft.email = e.target.value
          })
        }
      />
      <TextField
        id='filled-basic'
        type='password'
        label='Mot de passe'
        variant='filled'
        autoComplete='off'
        required
        value={password}
        onChange={e =>
          setUser(draft => {
            draft.password = e.target.value
          })
        }
      />
      {create && (
        <TextField
          id='filled-basic'
          type='password'
          label='Confirmez votre mot de passe'
          variant='filled'
          autoComplete='off'
          required
          value={confirmedPassword}
          onChange={e =>
            setUser(draft => {
              draft.confirmedPassword = e.target.value
            })
          }
        />
      )}
      {create ? (
        <>
          <Button
            style={{ margin: '20px 0 5px 0' }}
            variant='contained'
            color='secondary'
            disabled={loading}
            onClick={register}
          >
            {label}
          </Button>
        </>
      ) : (
        <>
          <Button
            style={{ margin: '20px 0 5px 0' }}
            variant='contained'
            color='secondary'
            disabled={loading}
            onClick={connect}
          >
            {label}
          </Button>
          <div>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name='checkedA'
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    color='primary'
                  />
                }
                label={
                  <Typography component={'span'} style={{ fontSize: '0.8rem' }}>
                    Se souvenir de moi
                  </Typography>
                }
              />
            </FormGroup>
          </div>
        </>
      )}
    </form>
  )
}

function PopupLogin({ open, handleClose, signup = false, status }) {
  const classes = useStyles()
  const [create, setCreate] = useState(signup)
  const { login, logout, register } = useAuth()
  const [error, setError] = useState('')

  const handleSignUp = () => {
    setCreate(true)
  }

  const handleSignIn = () => {
    setCreate(false)
  }

  const spinner =
    status === 'fetching ' ? <CircularProgress color='secondary' /> : <></>

  return (
    <>
      <Dialog
        classes={{
          paper: classes.dialog,
        }}
        style={{ backgroundColor: 'transparent' }}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title' sx={{ textAlign: 'center' }}>
          DashTrade
        </DialogTitle>
        <DialogContent>
          <LoginForm
            create={create}
            login={login}
            register={register}
            logout={logout}
            setError={setError}
          />
          {error ? <Alert severity='error'>{error}</Alert> : null}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'flex-start' }}>
          {!create ? (
            <Button onClick={handleSignUp} color='secondary'>
              Nouveau sur DashTrade? {spinner}
            </Button>
          ) : (
            <Button onClick={handleSignIn} color='secondary' autoFocus>
              Vous possédez déjà un compte ? {spinner}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
export default PopupLogin
