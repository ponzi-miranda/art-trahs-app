import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

export default function SalesList(){

    const[sales, setSale] = useState([])

    const loadSales = async () => {
        const response = await fetch('http://localhost:4000/salesEvent/2')
        const data = await response.json()
        setSale(data)
    }

    useEffect(() =>{
        loadSales()
    }, [])

    const columns = [
        {
            name: "brand", 
            label:"Marca"
        },
        {
            name: "product", 
            label:"Producto"
        },
        {
            name: "payment",
            label:"Forma de pago"
        },
        {
            name: "quantity",
            label:"Cantidad"
        },
        {
            name: "total",
            label:"Total"
        },
        {
            name: "profit",
            label:"20%"
        },
      //         {
      //   name: "Delete",
      //   options: {
      //     filter: false,
      //     sort: false,
      //     empty: true,
      //     print: false,
      //     customBodyRenderLite: (dataIndex) => {
      //       return (
      //         <button onClick={() => {
      //           const { data } = this.state;
      //           data.shift();
      //           this.setState({ data });
      //         }}>
      //           Delete
      //         </button>
      //       );
      //     }
      //   }
      // },
      {
        name: "Editar",
        options: {
          filter: false,
          print: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <button onClick={() => window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)}>
                ✏️
              </button>
            );
          }
        }
      },
    ];
    
//     const options = {
//       filterType: 'textField',
//       filter: false
//     };



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
      console.log(action);
      console.dir(state);
    }
  };


  return (
    <CacheProvider value={muiCache}>
       <h1>Ventas</h1>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"Ultimas ventas"}
          data={sales}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.render(<SalesList />, document.getElementById("root"));


