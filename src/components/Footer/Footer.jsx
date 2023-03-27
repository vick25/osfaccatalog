import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://osfac.net/fr/">
                OSFAC Catalog
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}


function Footer() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                {/* <Typography variant="h6" component="h6" gutterBottom>
                    Create React App example with styled-components
                </Typography> */}
                <Copyright />
            </Box>
        </Container>
    )
}

export default Footer