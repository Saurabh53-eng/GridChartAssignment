import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { useState, useEffect, useMemo, useRef } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { Link } from "react-router-dom";
import '../App.css'
const AgGrid = () => {

    var baseUrl = "http://localhost:5000/api/v1/fetchallEmployees";

    const [rowData, setrowData] = useState([
        { id: "", employee_name: "", employee_salaryinMonth: "" }
    ]);

    const columnDefs=[
        { field: 'id' },
        { field: 'employee_name' },
        { field: 'employee_salaryinMonth' }
    
    ]
       
    const defaulColDef = useMemo(() => ({
        sortable: true,
        editable: true,
        resizable:true,
        cellClass: "cell-border cell-vertical-align-text-right"
    }), [])

//for fetching Employee from database 
    useEffect(() => {
        const fetchallEmployees = async () => {
            // API Call 
            const response = await fetch(`${baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const json = await response.json()
            setrowData(json)
        };
        fetchallEmployees()
    }, [baseUrl])

    const gridRef = useRef();

    return (
        <div className="container">
            <h2>Double click on item to update it manually and press enter </h2>
            <h3>Data connected with MongoDb atlas</h3>
            <Link to="/barchart">
                <button className="btn btn-primary" style={{padding:"2px",cursor:"pointer"}}>Show Data in BarChart</button>
            </Link>
            <div className="ag-theme-alpine" style={{ height: 500  }}>
                <AgGridReact ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    animateRows={true}
                    defaultColDef={defaulColDef}
                />
            </div>
        </div>
    )
}

export default AgGrid
