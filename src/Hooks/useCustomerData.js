import { useForm } from 'react-hook-form'
import { useAuth } from '../Services/Auth/AuthContext'


function useCustomerData(){

    const { signup, login } = useAuth()

    const methods = useForm() 

    const {register, handleSubmit} = methods;

    return { methods, signup, login, register, handleSubmit }
}
    // TODO: 
    // regex email validation
//const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export {useCustomerData}