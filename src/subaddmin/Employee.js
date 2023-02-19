import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import './styles.css'
import axios from "axios";

let token = localStorage.getItem('token')

const Employee = () => {
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState('');
    const [idnumber, setIdnumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('')
    const [salary, setSalary] = useState('');
    const [sex, setSex] = useState('');
    const [responsibilty, setResponsibilty] = useState('')
    const [address, setAddress] = useState('')
    const [town, setTown] = useState('');

    const [employee, setEmployee] = useState();
    const [category, setCategory] = useState()
  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const employeeData = {
            firstname,
            lastname,
            idnumber,
            phone,
            email,
            salary,
            sex,
            responsibilty,
            address,
            town

    
        }
        const response = await axios.post("https://korgasbackend.onrender.com/api/v1/employee", employeeData, {
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
            window.location.replace("/employee")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }

    //  fetch employee's data
    useEffect(() => {
        const employeedata = () => {
            axios.get('https://korgasbackend.onrender.com/api/v1/employee', {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    const myemplo = res.data.employee;
                    setEmployee(myemplo)
                })
        }
        // fetch address data
        const myCategoey = () => {
            axios.get("https://korgasbackend.onrender.com/api/v1/address", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getcategory = res.data.address;
                    setCategory(getcategory)
                })

            console.log("Category", category)

        }
        myCategoey()
        employeedata()
    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create Employee
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                               
                                    <h5 class="modal-title" id="exampleModalLabel">Create Customer</h5>

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
                                            <input type="text" class="form-control" placeholder="First Name"
                                                onChange={(e) => setFirstname(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Last Name"
                                                onChange={(e) => setLastname(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="ID Number"
                                                onChange={(e) => setIdnumber(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Phone"
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Salary"
                                                onChange={(e) => setSalary(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Sex"
                                                onChange={(e) => setSex(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Responsibilty"
                                                onChange={(e) => setResponsibilty(e.target.value)}
                                            />
                                        </div><br />
                                        <select class="form-select" aria-label="Default select example" 
                                            onChange={(e) => setAddress(e.target.value)}
                                    >
                                      
                                        {
                                            category?.map((catdata, index) => {
                                                return (
                                                    // <option>{catdata.district}</option>
                                                    <option key={index}>{catdata.district}</option>
                                                )
                                            })
                                        }

                                    </select><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Town"
                                                onChange={(e) => setTown(e.target.value)}
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

                                        <th scope="col">FirstName</th>
                                        <th scope="col">LastName</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">IdNumber</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Salary</th>
                                        <th scope="col">Town</th>
                                        <th scope="col">Address</th>
                              

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employee?.map((emplodata) => {
                                            return (
                                                <tr>
                                                    <td>{emplodata.firstname}</td>
                                                    <td>{emplodata.lastname}</td>
                                                    <td>{emplodata.email}</td>
                                                    <td>{emplodata.idnumber}</td>
                                                    <td>{emplodata.phone}</td>
                                                    <td>{emplodata.salary}</td>
                                                    <td>{emplodata.address}</td>
                                                    <td>{emplodata.town}</td>
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

export default Employee;


