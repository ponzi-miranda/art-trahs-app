import {Button, Card, CardContent, Grid, TextField, FormLabel, RadioGroup, FormControlLabel, Radio,
     Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useState, useEffect} from "react"

export default function ProductForm(){
    
    const loadBrands = async (e) =>{
        const response = await fetch('https://art-trash.herokuapp.com/users')
        const data = await response.json()
        data.shift();
        setBrands(data)
    }

    useEffect(() =>{
        loadBrands()
    }, [])

    const[sale, setSale] = useState({
        brand_id: '',
        payment_method_id: '',
        product_id: '',
        quantity: 0,
        total: 0,
        profit: 0
    })

    const[brands, setBrands]= useState([])

    const[brand]= useState({
        brand_id: ''
    })
    
    const[products, setProducts]= useState({
        id: '',
        description: '',
        price: '',
        product_type_id: '',
    })

    const buttonDisabled = () => {
        if(sale.product_id && sale.quantity > 0 && sale.payment_method_id && sale.brand_id){

            return false;
        }

        return true
    }

    const selectBrand = async (e) => {

        let name = e.target.name;
        let value = e.target.value;
        brand[name] = value;
        setSale({...sale, brand_id: brand.brand_id});

        var data = value;
        var response = await fetch('http://localhost:4000/products/brand/' + data)
        data = await response.json()
        
        setProducts(data)
    }

    const calculate = () => {
        let profit = 0
        let product = products.find(product => product.id === sale.product_id);
        let price = Number(product.price);
        
        if(product.product_type_id === 1){
            profit = (price * sale.quantity) * 0.2;
        }

        setSale({...sale, total: Number(price * sale.quantity), profit: Number(profit)})
    }
    
    console.log(sale);


    const handleSubmit = async (e) => {
    
        calculate(e);
        
        e.preventDefault();
        const res = await fetch('http://localhost:4000/sales', {
            method:'POST',
            body: JSON.stringify(sale),
            headers:{"Content-Type": "application/json"},
        });
        
        const data = await res.json();
    };


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
                                NUEVA VENTA
                        </Typography>
                        <CardContent>
                            <form onSubmit={handleSubmit}> 

                            <InputLabel >Marca:</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Marca:"
                                    name="brand_id"
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                    onChange={selectBrand}
                                    fullWidth
                                >
                                {brands.map(brand =>(
                                    <MenuItem value={brand.id}>{brand.name}</MenuItem>
                                ))}
                                </Select>

                                <InputLabel >Producto:</InputLabel>
                                <Select
                                    variant="outlined"
                                    label="Tipo:"
                                    name="product_id"
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                    onChange={e => {setSale({...sale, product_id: e.target.value})}}
                                    fullWidth
                                >
                                    {products && products.length>0 && products.map((product, index) => (
                                    <MenuItem value={product.id}>{product.description}</MenuItem>
                                    ))}
                                </Select>

                                <TextField
                                    variant="outlined"
                                    label="Cantidad:"
                                    sx={{
                                        display:'block',
                                        margin:'.5rem 0'
                                    }}
                                    name="quantity"
                                    onChange={e => setSale({...sale, quantity: Number(e.target.value)})}
                                    inputProps={{style: {color: "white"}}}
                                    InputLabelProps={{style: {color: "white"}}}
                                />

                                <FormLabel id="demo-row-radio-buttons-group-label">Forma de pago:</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="payment_method_id"
                                        onChange={e => setSale({...sale, payment_method_id: e.target.value})
                                    }
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Efectivo" selected/>
                                        <FormControlLabel value="2" control={<Radio />} label="Transferencia" />
                                    </RadioGroup>


                                <Button variant="outlined" color="inherit" type="submit" disabled={buttonDisabled()}>
                                    Cargar Venta
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    )
}