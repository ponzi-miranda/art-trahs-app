import {Box, AppBar, Toolbar, Container, Button, Card, CardContent, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useState, useEffect} from "react"
import { Link, useNavigate } from 'react-router-dom'


export default function AdminMenu(){
    
    const navigate = useNavigate()

    const[user, setUser]= useState({
        id:"",
        roleid: ""
    })

    const loadUser = async (id) => {
        const res = await fetch(`http://localhost:4000/users/${id}`)
        const data = await res.json()

        setUser({id: data[0].id, roleid: data[0].roleid})
    };

    useEffect(() =>{
        let userID = sessionStorage.getItem('brand_id');
        if(userID != null){
            loadUser(userID);
        }else{
            navigate("/");
        }
    }, [])

    if(user.roleid == 2){
        navigate("/");
    }

    return(
        <><Box sx={{ flexGrow: 1 }}>
            <AppBar position='static' color='transparent' id="navbar">
                <Container>
                    <Toolbar>
                        <Typography sx={{ flexGrow: 1 }}>
                            <Link to="/home">ART-TRASH</Link>
                        </Typography>

                        <Button variant='contained' color='secondary' onClick={() => navigate("/")}>
                            Cerrar Sesion
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
        <Container>
        <Grid
            container
            direction="column"
            alignContent="center"
            justifyContent="center">
                <Grid item xs={3}>
                    <Card
                        sx={{ mt: 5 }} style={{
                            backgroundColor: 'gray',
                            padding: "12rem"
                        }}>
                        <CardContent>
                            <form>
                                <Button variant="outlined" size="large" color="inherit" type="submit" sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                    onClick={() => navigate('/events/dashboard')}>
                                    EVENTOS
                                </Button>

                                <Button variant="outlined"  size="large" color="inherit" type="submit" sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                    onClick={() => navigate('/products')}>
                                    STOCK
                                </Button>

                                <Button variant="outlined" size="large" color="inherit" type="submit" sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                    onClick={() => navigate('/sales')}>
                                    VENTAS
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            </Container>
            </>
    )
}