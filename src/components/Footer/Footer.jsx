import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

function Copyright() {
    const today = new Date();
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://osfac.net/fr/">
                OSFAC Catalog
            </Link>{' '} 2022-
            {today.getFullYear()}.
        </Typography>
    );
}


function Footer() {
    return (
        <footer>
            <Container maxWidth="sm">
                <Box sx={{ my: 3 }} style={{ 'marginBottom': 0 }}>
                    <Copyright />
                </Box>
            </Container>
        </footer>
    )
}

export default Footer