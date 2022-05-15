import {Button, Card, CardContent, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

export default function ProductForm(){

    const[products, setProductTypes]= useState([])
    const params = useParams()

    const loadProductTypes = async (e) =>{
        const response = await fetch('https://art-trash.herokuapp.com/product/types')
        const data = await response.json()
        setProductTypes(data)
    }

    const[product, setProduct]= useState({
        brand_id: sessionStorage.getItem('brand_id'),
        serial_number: '',
        description: '',
        product_type_id:'',
        price:''
    })

    const[stock, setStock] = useState({
        
        brand_id: sessionStorage.getItem('brand_id'),
        product_id: '',
        quantity: ''
    })

    const [editing, setEditing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (editing){

            const resProduct = await fetch(`http://localhost:4000/products/${params.id}`, {
            method:'PUT',
            body: JSON.stringify(product),
            headers:{"Content-Type": "application/json"},
            });
            const productData= await resProduct.json();

            const resStock = await fetch(`http://localhost:4000/stock/${params.id}`, {
                method:'PUT',
                body: JSON.stringify(stock),
                headers:{"Content-Type": "application/json"},
            });
            const stockData = await resStock.json();


        }else{
            const resProduct = await fetch('https://art-trash.herokuapp.com/products', {
            method:'POST',
            body: JSON.stringify(product),
            headers:{"Content-Type": "application/json"},
            });
            const productData= await resProduct.json();

            var product_id = productData.body.product.id;
            stock.product_id = product_id;

            const resStock = await fetch('https://art-trash.herokuapp.com/stock', {
                method:'POST',
                body: JSON.stringify(stock),
                headers:{"Content-Type": "application/json"},
            });
            const stockData = await resStock.json();
        }
    };

    const handleChange = (e) =>
        setProduct({...product,[e.target.name]: e.target.value});
    
    const handleChangeQuantity = (e) =>
        setStock({...stock,[e.target.name]: e.target.value});

    const loadProduct = async (id) => {
        const res = await fetch(`https://art-trash.herokuapp.com/products/data/${id}`)
        const data = await res.json()
        console.log(data)
        setProduct({description: data[0].description, serial_number: data[0].serial_number, product_type_id: data[0].product_type_id, price: data[0].price, brand_id: data[0].brand_id})
        setStock({quantity: data[0].quantity, product_id: params.id})
        setEditing(true)
    };

    useEffect(() =>{
        loadProductTypes();
        if(params.id){
            loadProduct(params.id);
        }
    }, [params.id])

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
                                ALTA DE PRODUCTO
                        </Typography>
                        <CardContent>
                            <form onSubmit={handleSubmit}> 
            
                                <TextField
                                    variant="outlined"
                                    label="Nombre:"
                                    sx={{
                                        display:'block',
                                        margin:'.5rem 0'
                                    }}
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                />

                                <TextField
                                    variant="outlined"
                                    label="Código:"
                                    sx={{
                                        display:'block',
                                        margin:'.5rem 0'
                                    }}
                                    name="serial_number"
                                    value={product.serial_number}
                                    onChange={handleChange}
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                />

                                <InputLabel >Tipo:</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Tipo:"
                                    name="product_type_id"
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                    onChange={handleChange}
                                    fullWidth
                                    value={product.product_type_id}
                                >
                                {products.map(productType =>(
                                            
                                    <MenuItem value={productType.id}>{productType.description}</MenuItem>
                                ))}
                                </Select>
                                
                                <TextField
                                    variant="outlined"
                                    label="Precio:"
                                    sx={{
                                        display:'block',
                                        margin:'.5rem 0'
                                    }}
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                />

                                <TextField
                                    variant="outlined"
                                    label="Cantidad:"
                                    sx={{
                                        display:'block',
                                        margin:'.5rem 0'
                                    }}
                                    name="quantity"
                                    value={stock.quantity}
                                    onChange={handleChangeQuantity}
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                />
                                <Button variant="outlined" color="inherit" type="submit">
                                    Cargar Producto
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}