import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import './styles.css'

let token = localStorage.getItem('token')
const GetKgs = () => {

    const [gaskgs, setGaskgs] = useState()
    

    useEffect(() => {
        const mygaskgs = () => {
            axios.get("https://korgasbackend.onrender.com/api/v1/kgs", {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getgaskgs = res.data.kgs;
                    
                    const getcylider = res.data.cylinders;

                    setGaskgs(getgaskgs)

                    // console.log(getcylider)
                    
                }) 
        }
    
        mygaskgs()
    
    }, []);

    return(
        <>
            <Sidebar />
            <div className='profileside'>

                <div class="container">
                <div className="scroller">
                    <h1>gas</h1>
                   

                    {
                          gaskgs?.map((gasdata) => {
                            return (
                    <div className="userform">
                        
                        <div className="row" key={gasdata._id}>
                            <div className="col">
                                <h1>Date</h1>
                                <p>{gasdata.date}</p>
                            </div>
                            <div className="col">
                                <h1>Customer</h1>
                                <p>{gasdata.customer}</p>
                            </div>
                            <div className="col">
                                <h1>Gas Culcations</h1>
                                <table class="table">
                                    <thead>
                                        <tr>
                                     
                                        <th scope="col">kgs</th>
                                        <th scope="col">Cyliders</th>
                                        <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                   
                                                {
                                                    gasdata.cylinders.map(datame => (
                                                        <tbody>
                                                        <tr>
                                                    <>
                                                        <td>{datame.kgs}</td>
                                                        <td>{datame.quantity}</td>
                                                        <td>{datame.total}</td> 
                                                    </>
                                                    </tr>
                                        
                                       
                                    </tbody>
                                                ))}
                                      
                                    </table>
                            </div>

                            <div className="col">
                                <center>
                                <h1>Final Total</h1>
                                </center>
                                
                                <h3>{gasdata.finaltotal}</h3>
                                <br/>
                                <div class="btnSubmit1">Print</div>

                            </div>
                        </div>
                    </div>

                    )

                    })
                    }
        </div>

                </div>
            </div>
        </>
    )
}

export default GetKgs;


