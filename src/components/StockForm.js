import {Button, Card, CardContent, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useState, useEffect} from "react"

export default function StockForm(){
    
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

        products.map(product =>(
            <Grid 
            container 
            direction="column" 
            alignContent="center" 
            justifyContent="center">
                <Grid item xs={3}>
                    <Card
                        sx={{mt : 5}} style={{
                        backgroundColor:'gray',
                        padding:"1rem"
                    }}>
                        <Typography variant='5' textAlign='center' color='whitesmoke'>
                                Cargar Stock
                        </Typography>
                        <CardContent>
                            <form onSubmit={handleSubmit}> 
                                <InputLabel >Productos</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Productos"
                                    name="product_id"
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                <MenuItem value={product.id}>{product.description}</MenuItem>
                                </Select>
                                <TextField
                                    variant="outlined"
                                    label="Cantidad:"
                                    sx={{
                                        display:'block',
                                        margin:'.5rem 0'
                                    }}
                                    name="quantity"
                                    onChange={handleChange}
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                />
                                <Button variant="outlined" color="inherit" type="submit">
                                    Cargar Stock
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        ))
    )
}