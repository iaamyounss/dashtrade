import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useCustomerData } from '../../Hooks/useCustomerData'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import '../../index.css'


//TODO: send to api via signup authapp function, 
// hash the password before post in database and secure the user password



export default function LoginForm({setError}){

  const {login, handleSubmit, register, methods } = useCustomerData()

  // TODO: adding security to email format and password format
  async function onSubmit(e){
    try{
      await login(e.email, e.password)
    } catch(err){
      setError(`Erreur de connexion : ${err}`)
    }
  }
    return (
      // Provider from React-hook-form to simplify the submit form
      <>
        <FormProvider {...methods}>
          <form
            className='flex-column'
            onSubmit={handleSubmit(data => onSubmit(data))}
          >
            <Typography variant='h3' align='center' >Connexion</Typography>
           
            <div className="responsiveFlex"> 
            <TextField
              type="text"
              variant='filled'
              label="Email"
              autoComplete="off"
              required
              placeholder="Insérez ton email"
              focused
              className="login_form-login_input mr-10"
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
            </div>
            <Button type="submit" variant='contained' className='login_form-login_button'>Connexion</Button>
          </form>
        </FormProvider>
      </>
    )
}
