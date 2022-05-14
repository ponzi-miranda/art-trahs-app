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

export default function StockList(){

    const[stock, setStock] = useState([])

    const loadStock = async () => {
        const response = await fetch('https://art-trash.herokuapp.com/stock/brand/' + sessionStorage.getItem('brand_id'))
        const data = await response.json()
        setStock(data)
    }

    useEffect(() =>{
        loadStock()
    }, [])

    const columns = [
        {
            name: "description", 
            label:"Producto"
        },
        {
            name: "type",
            label:"Tipo"
        },
        {
            name: "price",
            label:"Precio"
        },
        {
            name: "quantity",
            label:"Cantidad"
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
              <button onClick={() => window.location.replace("http://localhost:3000/EditProduct/" + stock[dataIndex].product_id)}>
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
       <h1>Listado de Stock</h1>
      <ThemeProvider theme={createTheme()}>
        <MUIDataTable
          title={"Stock al (fecha)"}
          data={stock}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.render(<StockList />, document.getElementById("root"));


