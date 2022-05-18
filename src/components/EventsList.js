import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import {Button} from "@mui/material";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});
export default function EventsList () {
    const[events, setEvents] = useState([])

    const loadEvents = async () => {
        const response = await fetch('https://art-trash.herokuapp.com/events')
        const data = await response.json()
        
        setEvents(data)
    }

    useEffect(() =>{
        loadEvents()
    }, [])
    console.log(events)
    events.forEach(evento => {
        if(evento.finish_date != null){
            var ferchaFormateada1 = evento.finish_date.split("T")
            evento.finish_date = ferchaFormateada1[0]
            var ferchaFormateada2 = evento.start_date.split('T')
            evento.start_date = ferchaFormateada2[0]
            console.log(evento)
        }
        
    });
    const columns = [
        {
            name: "name", 
            label:"Evento"
        },
        {
            name: "start_date",
            label:"Fecha de inicio"
        },
        {
            name: "finish_date",
            label:"Fecha de fin"
        },
        {
            name: "inscription",
            label:"Precio Inscripcion"
        },
        {
          name: "Editar",
          options: {
            filter: false,
            print: false,
            sort: false,
            empty: true,
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                <Button variant="contained" color="inherit" onClick={() => window.location.replace(`http://localhost:3000/event/${events[dataIndex].id}/edit`)}>
                  ✏️
                </Button>
              );
            }
          }
        },
      
    ];
    
  const options = {
    search: true,
    print: true,
    filter: true,
    download: false,
    filterType: "dropdown",
    responsive: "standar",
    tableBodyHeight: "100%",
    tableBodyMaxHeight: "100%",
    selectableRows: false,
    onTableChange: (action, state) => {
    }
  };

  return (
    <CacheProvider value={muiCache}>
       <h1>Listado de Eventos</h1>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"Todos los eventos"}
          data={events}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.render(<EventsList />, document.getElementById("root"));
