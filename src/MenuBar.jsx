import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home'
import { useOktaAuth } from '@okta/okta-react';
import {useHistory} from "react-router-dom";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const logoUrl = 'https://static.wikia.nocookie.net/warner-bros-entertainment/images/6/6e/Acme-corp.png'

const classes = {
    logo: {

        maxHeight: 40,
        margin:'auto'

    },
    logoContainer: {
        flexGrow: 1,
        // display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin:'auto'



    }
};

export default function MenuBar() {

    const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

    const login = async () => history.push('/login');
    const home = async () => history.push('/');
    const logout = async () => oktaAuth.signOut();
    const myPortal = async () => history.push('/dashboard');

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={home}
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ACME Financial
                    </Typography>
                    <Box style={classes.logoContainer}>
                        <img src={logoUrl} style={classes.logo}  />
                    </Box>
                    {authState.isAuthenticated ?
                        <LoggedIn logout={logout} myPortal={myPortal}/> :
                        <Button variant={'text'} color='inherit' onClick={login}>Login</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function LoggedIn({logout, myPortal}) {
    return(
        <div>
            <Button variant={'text'} color='inherit' onClick={ logout }>Logout</Button>
            <Button variant={'text'} color='inherit' onClick={myPortal}>MyPortal</Button>
            <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </div>
    )
}