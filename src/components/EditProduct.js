import {Button, Card, CardContent, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useState, useEffect} from "react"
import {useSearchParams} from "react-router-dom"
import { useParams } from "react-router";

export default function ProductForm(){
    
    let { id } = useParams();

    console.log(id);

    const[products, setProductTypes]= useState([])
    const[productData, setProductData]= useState([])


    const loadProductTypes = async (e) =>{
        const response = await fetch('https://art-trash.herokuapp.com/product/types')
        const data = await response.json()
        setProductTypes(data)
    }

    const loadProductData = async (e) =>{
        const response = await fetch('https://art-trash.herokuapp.com/products/data/' + id)
        const data = await response.json()
        setProductData(data)

        console.log(data)
    }

    useEffect(() => {
        loadProductData();
        loadProductTypes();
    },[]);

    
    // 
    //     brand_id: '',
    //     serial_number: '',
    //     description: '',
    //     product_type_id:'',
    //     price:''
    // })

    const[product, setProduct]= useState({
        brand_id: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://art-trash.herokuapp.com/products', {
            method:'POST',
            body: JSON.stringify(product),
            headers:{"Content-Type": "application/json"},
        });
        const data = await res.json();

        console.log(data);

        var product_id = data.body.product.id;
        stock.product_id = product_id;

        const res1 = await fetch('https://art-trash.herokuapp.com/stock', {
            method:'POST',
            body: JSON.stringify(stock),
            headers:{"Content-Type": "application/json"},
        });
        const data1 = await res1.json();

        console.log(data1);
    };

    const handleChange = (e) =>
        setProduct({...product,[e.target.name]: e.target.value});
    
    const handleChangeQuantity = (e) =>
        setStock({...stock,[e.target.name]: e.target.value});


        // if(window.onload == true){
        //     return(
        //         <div>
        //             cargadooooo
        //         </div>
        //     )
        // }
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
                                EDITAR PRODUCTO
                        </Typography>
                        <CardContent>
                            <form onSubmit={handleSubmit}> 

                                    {productData.map(p =>(
                                         <><><><TextField
                                            variant="outlined"
                                            label="Nombre:"
                                            sx={{
                                                display: 'block',
                                                margin: '.5rem 0'
                                            }}
                                            name="description"
                                            onChange={handleChange}
                                            inputProps={{ style: { color: "white" } }}
                                            InputLabelProps={{ style: { color: "white" } }}
                                            value={p.description} /></><><InputLabel>Tipo:</InputLabel><Select
                                                variant="outlined"
                                                label="Tipo:"
                                                name="product_type_id"
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{ style: { color: "white" } }}
                                                onChange={handleChange}
                                                fullWidth
                                                value={p.product_type_id}
                                            >
                                                {products.map(productType => (
                                                    <MenuItem value={productType.id}>{productType.description}</MenuItem>
                                                ))}
                                            </Select></></>
                                            <TextField
                                                variant="outlined"
                                                label="Precio:"
                                                sx={{
                                                    display: 'block',
                                                    margin: '.5rem 0'
                                                }}
                                                name="price"
                                                onChange={handleChange}
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{ style: { color: "white" } }}
                                                value={p.price} />
                                                
                                            <TextField
                                                variant="outlined"
                                                label="Cantidad:"
                                                sx={{
                                                    display: 'block',
                                                    margin: '.5rem 0'
                                                }}
                                                name="quantity"
                                                onChange={handleChangeQuantity}
                                                inputProps={{ style: { color: "white" } }}
                                                InputLabelProps={{ style: { color: "white" } }}
                                                value={p.quantity} /></>
                                            ))}
                                <Button variant="outlined" color="inherit" type="submit">
                                    Editar Producto
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}