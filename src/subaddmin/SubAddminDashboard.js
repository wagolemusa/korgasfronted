import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import './styles.css';
let token = localStorage.getItem('token')

const SubAddminDashboard = () => {

    const [totalgas, setTotalgas ] = useState()
    const [currentgas,  setCurrentgas ] = useState()

    useEffect(() => {

        // get the sums from the kgs table
        const mytotalgas = () => {
            axios.get("http://localhost:5000/api/v1/total", {
                headers: {
                 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const gettotal = res.data.kgstotal;
                    setTotalgas(gettotal)
                })
        }

        
        // get the current total from the tank
        const mycurrentgas = () => {
            axios.get("http://localhost:5000/api/v1/current/stock", {
                headers: {
                  
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getcurrent = res.data.stockgas.currentStock;
                    console.log(getcurrent)
                    setCurrentgas(getcurrent)
                })
        }

        mytotalgas()
        mycurrentgas()

    },  []);


    // loop for the total gas
    let gastatol =  totalgas?.map((gas) =>{
            return gas.total;
        })
    
    
    let final = gastatol - currentgas;
   


    return(
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                            
                            <div className="col">
                            <div className="open">
                            <h2>Open Stock</h2>
                            <p>{currentgas}</p> 
                            <br/>
                            </div>
                            </div>
                           
                            <div className="col">
                            <div className="sold">
                            <h2> Total Gas Sold</h2>
                            <p>{gastatol}</p>
                            </div>
                            </div>
                            
                            <div className="col">
                            <div className="current mb-4">
                            <h2> Current Gas Total</h2>
                            <p> {final}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
            
                </div>

                
            </div>
        </>
    )
}

export default SubAddminDashboard;


