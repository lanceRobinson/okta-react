import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useHistory} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {useOktaAuth} from "@okta/okta-react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Album() {

    const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();
    const apply = async () => history.push('/apply');
    const login = async () => history.push('/login');
    const myPortal = async () => history.push('/dashboard');

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            ACME Financial
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Money can't buy happiness...<br/>
                            But poverty can't buy anything.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            divider={<Divider orientation="vertical" flexItem />}
                        >
                            {authState.isAuthenticated ?
                                <Button variant="contained" onClick={myPortal}>Take me to MyPortal</Button> :
                            <NoAuth apply={apply} login={login}/>}
                        </Stack>
                    </Container>
                </Box>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    OKTA Demo
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Lance Robinson
                </Typography>
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}

function NoAuth({apply, login}) {
    return(
        <div>
            <Button variant="contained" onClick={apply}>New Account Application</Button>
            <Button variant="outlined" onClick={login}>Portal Registration/Login</Button>
        </div>
    )
}