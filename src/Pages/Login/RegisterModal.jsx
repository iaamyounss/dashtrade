import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useCustomerData } from '../../Hooks/useCustomerData'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import '../../index.css'

//TODO: add design, send to api via signup authapp function, 
// hash the password before post in database and secure the user password
// hash the password when send to firebase
// submit func
// password security with digits formats
// add some style


export default function RegisterModal({setError}){

  const { signup, handleSubmit, register, methods } = useCustomerData() 
  

  // TODO: adding security to email format and password format
  async function onSubmit(e){
    try{
      await signup(e.email, e.password)
    } catch(err){
      setError(`Erreur d'inscription : ${err}`)
    }
  }


    
    return (
      // Form Provider from React-hook-form to simplify the submit form
      <>
        <FormProvider {...methods}>
          <form
            className='flex-column'
            onSubmit={handleSubmit(data => onSubmit(data))}
          >
            <Typography variant='h3' align='center'>Inscription</Typography>
          
          <div style={{ display: 'flex', }}>
            <TextField
              type="text"
              variant='filled'
              label="Firstname"
              autoComplete="off"
              required
              placeholder="Firstname"
              focused
              className="login_form-login_input pr-10"
              {...register('firstname', {required: true})}
            />
            <TextField
              type="text"
              variant='filled'
              label="Name"
              autoComplete="off"
              required
              placeholder="Name"
              focused
              className="login_form-login_input"
              {...register('name', {required: true})}
            />
            </div>
            <TextField
              type="text"
              variant='filled'
              label="Email"
              autoComplete="off"
              required
              placeholder="Insérez ton email"
              focused
              className="login_form-login_input"
              {...register('email', {required: true})}
            />
            <TextField
              type="password"
              variant='filled'
              label="Mot de passe"
              autoComplete="off"
              required
              placeholder="Insère ton mot de passe"
              focused
              className="login_form-login_input"
              {...register('password', {required: true})}
            />
            <Button type="submit" variant='contained' className="login_form-login_button">Inscription</Button>
          </form>
        </FormProvider>
      </>
    )
}
