import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import './styles.css'
import axios from "axios";
let token = localStorage.getItem('token')

const Treller = () => {
    const [treller, setTreller] = useState();
    const [date, setDate] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const [driverName, setDriverName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [first_time_net_wight, setFirst_time_net_wight] = useState('');
    const [second_time_net_wight, setSecond_time_net_wight] = useState('');
  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const treller = {
            date,
            numberPlate,
            driverName,
            phoneNumber,
            first_time_net_wight,
            second_time_net_wight,
    
        }
        const response = await axios.post("http://localhost:5000/api/v1/treller", treller, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .catch((err) => {
                if (err && err.response) setError(err.response.data.message);
                setSuccess(null)
            });
        if (response && response.data) {
            setError(null)
            setSuccess(response.data.message);
        }
        if (response.status === 201) {
            window.location.replace("/treller")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }

    useEffect(() => {
        const trellerdata = () => {
            axios.get('http://localhost:5000/api/v1/treller', {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    const mytreller = res.data.treller;
                    setTreller(mytreller)
                })
        }
        trellerdata()
    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Treller
                    </button>


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                               
                                    <h5 class="modal-title" id="exampleModalLabel">Add Treller</h5>

                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {!error && <div className='suc'>{success ? success : ""}</div>}
                                {!success && Array.isArray(error) ? error.map((item, i) => (
                                    <div class="notice notice-danger alert fade show" role="alert">
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                        <h4 key={i}> {item} </h4>
                                    </div>
                                )) : <p>{error} </p>
                                }
                                 <form onSubmit={handleSubmit}>
                                <div class="modal-body">
                                
                                        <div class="form-group">
                                            <input type="date" class="form-control" placeholder="Date"
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Number Plate"
                                                onChange={(e) => setNumberPlate(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Driver Name"
                                                onChange={(e) => setDriverName(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="number" class="form-control" placeholder="Phone Number"
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="First Net Weight"
                                                onChange={(e) => setFirst_time_net_wight(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="second Net weight"
                                                onChange={(e) => setSecond_time_net_wight(e.target.value)}
                                            />
                                        </div><br />
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                              
                                </div>
                                </form>
                            
                                
                            </div>
                        
                        </div>
                       
                 </div>
                        
                

                    {/* Fetch Treller Data */}
                    <div className="userform">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Date</th>
                                        <th scope="col">Number Plate</th>
                                        <th scope="col">Driver Name</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Frist Tiime Net Weight</th>
                                        <th scope="col">Second Tiime Net Weight</th>
                                        <th scope="col">Gass Loss</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        treller?.map((trellerdata) => {
                                            return (
                                                <tr>
                                                    <td>{trellerdata.date}</td>
                                                    <td>{trellerdata.numberPlate}</td>
                                                    <td>{trellerdata.driverName}</td>
                                                    <td>{trellerdata.phoneNumber}</td>
                                                    <td>{trellerdata.first_time_net_wight}</td>
                                                    <td>{trellerdata.second_time_net_wight}</td>
                                                    <td>{trellerdata.remain_gas_los}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
           </div>
        </>
    )
}

export default Treller;


