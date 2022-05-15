import{Box, AppBar, Container, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){

    const navigate = useNavigate()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static' color ='transparent'>
                <Container>
                    <Toolbar>
                        <Typography sx={{flexGrow: 1}}>
                            <Link to="/BrandMenu">ART-TRASH</Link>
                        </Typography>

                        <Button variant='contained' color='secondary' onClick={() => navigate("/")}>
                            Cerrar Sesion
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}