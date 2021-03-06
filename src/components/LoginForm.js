import {Button, Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react"
import { useNavigate } from 'react-router-dom'

export default function UsersForm(){
    const navigate = useNavigate()
 

    const[user, loginUser]= useState({
        email:'',
        password:'',
        roleid:''
    })
    
    const loadUser = async (id) => {
        const res = await fetch(`http://localhost:4000/users/${id}`)
        const data = await res.json()
        if(data[0].roleid==1){
            navigate("/home")
        }else{
            navigate("/menu")
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://art-trash.herokuapp.com/login', {
            method:'POST',
            body: JSON.stringify(user),
            headers:{"Content-Type": "application/json"},
        });

        const data = await res.json();
        
        sessionStorage.setItem('brand_id', data);

        if(sessionStorage.getItem('brand_id') != 'Error'){
            
            loadUser(sessionStorage.getItem('brand_id'));
        }
    };

  

    const handleChange = (e) =>
        loginUser({...user,[e.target.name]: e.target.value});

    return(
        
        <Grid 
        container 
        direction="column" 
        alignContent="center" 
        justifyContent="center">
            <Grid item xs={3}>
                <Card
                    sx={{mt : 5}} style={{
                    backgroundColor:'gray',
                    padding:"5rem"
                }}>
                    <Typography variant='5' textAlign='center' color='whitesmoke'>
                            Iniciar Sesión
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}> 
                            <TextField
                                variant="outlined"
                                label="Correo electrónico:"
                                type="email"
                                sx={{
                                    display:'block',
                                    margin:'.5rem 0'
                                }}
                                name="email"
                                onChange={handleChange}
                                inputProps={{style: {color: "white"}}}
                                InputLabelProps={{style: {color: "white"}}}
                                
                            />
                            <TextField
                                variant="outlined"
                                label="Contaseña:"
                                type="password"
                                sx={{
                                    display:'block',
                                    margin:'.5rem 0'
                                }}
                                name="password"
                                onChange={handleChange}
                                inputProps={{style: {color: "white"}}}
                                InputLabelProps={{style: {color: "white"}}}
                            />
                            <Button variant="outlined" color="inherit" type="submit">
                                Ingresar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}