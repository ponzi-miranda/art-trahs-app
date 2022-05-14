import {Button, Card, CardContent, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useState, useEffect} from "react"

export default function BrandMenu(){
    
    const[products, setProducts]= useState([])
    const loadProducts = async (e) =>{
        const response = await fetch('https://art-trash.herokuapp.com/products/brand/1')
        const data = await response.json()
        setProducts(data)
    }

    useEffect(() =>{
        loadProducts()
    }, [])

    const[stock, setStock]= useState({
        brand_id: 2,
        product_id: '',
        quantity: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://art-trash.herokuapp.com/stock', {
            method:'POST',
            body: JSON.stringify(stock),
            headers:{"Content-Type": "application/json"},
        });
        const data = await res.json();
        console.log(data);
    };

    const handleChange = (e) =>
        setStock({...stock,[e.target.name]: e.target.value});

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
                        padding:"12rem"
                    }}>
                        <CardContent>
                            <form onSubmit={handleSubmit}> 
                                <Button variant="outlined" size="large"  color="inherit" type="submit"  sx={{
                                        display:'block',
                                        margin:'.5rem 0',
                                    }}
                                    onClick={event =>  window.location.href='/Product'}>
                                  ALTA PRODUCTOS  
                                </Button>

                                <Button variant="outlined" size="large"  color="inherit" type="submit"  sx={{
                                        display:'block',
                                        margin:'.5rem 0',
                                        
                                    }}
                                    onClick={event =>  window.location.href='/StockList'}>
                                    LISTADO DE STOCK
                                </Button>

                                <Button variant="outlined" size="large" color="inherit" type="submit"  sx={{
                                        display:'block',
                                        margin:'.5rem 0',
                                    }}
                                    onClick={event =>  window.location.href='/SalesList'}>
                                    LISTADO DE VENTAS
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}