// leave communicate the database with the graphql api
import Paper from '@mui/material/Paper'
import UserWallet from './UserWallet'


const container = window !== undefined ? () => window().document.body : undefined;



export default function UserSettings() {
    return (
        <Paper  
            elevation={2}
            anchor="left" >

            <UserWallet />

        </Paper>
    )
}

