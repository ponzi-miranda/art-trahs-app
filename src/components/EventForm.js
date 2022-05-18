import React from 'react'
import {Button, Card, CardContent, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";

export default function EventForm () {

    const params = useParams()

    const[labels, setLabel]= useState({
    title: 'ALTA DE EVENTO',
    button: 'CREAR EVENTO'
    })

    const[event, setEvent]= useState({
        name:'',
        start_date:'',
        finish_date:'',
        inscription:0
    })

    const [editing, setEditing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editing){
            const res = await fetch(`http://localhost:4000/event/${params.id}`, {
            method:'PUT',
            body: JSON.stringify(event),
            headers:{"Content-Type": "application/json"},
            });
            const data= await res.json();
        }else{
            const res = await fetch('https://art-trash.herokuapp.com/event', {
                method:'POST',
                body: JSON.stringify(event),
                headers:{"Content-Type": "application/json"},
            });
            const data = await res.json();
        }
    };

    const loadEvent = async (id) => {
        const res = await fetch(`http://localhost:4000/event/${id}`)
        const data = await res.json()

        let startDate = data[0].start_date.split("T")
        let finishDate = data[0].finish_date.split("T")

        setEvent({name: data[0].name, inscription: data[0].inscription, start_date: startDate[0], finish_date: finishDate[0]})
        setLabel({title: 'EDITAR EVENTO', button:'EDITAR EVENTO'})
        setEditing(true)
    };

    console.log(event)

    useEffect(() =>{
        if(params.id){
            loadEvent(params.id);
        }
    }, [params.id])

    const handleChange = (e) =>
        setEvent({...event,[e.target.name]: e.target.value});
    
  return (
    <Grid
    container 
    direction="column" 
    alignContent="center" 
    justifyContent="center"
    >
    <Grid item xs={3}>
        <Card
            sx={{mt : 5}} style={{
            backgroundColor:'gray',
            padding:"5rem"}}>
                <Typography variant='5' textAlign='center' color='whitesmoke'>
                    {labels.title}
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
                            name="name"
                            value={event.name}
                            onChange={handleChange}
                            inputProps={{style: {color: "white"}}}
                            InputLabelProps={{style: {color: "white"}}}
                        />
                        
                        <TextField
                            variant="outlined"
                            label="Precio Inscripción:"
                            sx={{
                                display:'block',
                                margin:'.5rem 0'
                            }}
                            name="inscription"
                            value={event.inscription}
                            onChange={handleChange}
                            inputProps={{style: {color: "white"}}}
                            InputLabelProps={{style: {color: "white"}}}
                        />

                        <div className="App">
                        <TextField
                            variant="outlined"
                            sx={{
                                display:'block',
                                margin:'.5rem 0'
                            }}
                            name="start_date"
                            label="Fecha de inicio"
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                            value={event.start_date}
                            onChange={handleChange}
                        />
                        </div>
                            
                        <div className="App">
                        <TextField
                            variant="outlined"
                            sx={{
                                display:'block',
                                margin:'.5rem 0'
                            }}
                            name="finish_date"
                            label="Fecha de finalizacion"
                            InputLabelProps={{ shrink: true, required: true }}
                            type="date"
                            value={event.finish_date}
                            onChange={handleChange}
                        />
                        </div>
                            <Button variant="outlined" color="inherit" type="submit">
                                {labels.button}
                            </Button>
                    </form>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}