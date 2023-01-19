import React, { useState, useEffect} from "react";
import axios from 'axios'


function Register () {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname ] = useState("")
    const [middlename, setMiddle ] = useState("")
    const [phonenumber, setPhonenumber ] = useState("")
    const [idnumber, setIdnumber] = useState("")
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
   

           await axios.post("https://korgasbackend.onrender.com/users/api/register", {
                firstname,
                lastname,
                middlename,
                phonenumber,
                idnumber,
                email,
                password
            })  
            .then(res => {

                if(res.status === 201){
                    window.location.replace("/registerSuccessfully")
                }else{
                    // setError(res.data)  
                    console.log(res.data)
                }
         
        })
        
        
        
    }


    return (
        <div>
        <div class="container login-container">

            <div class="row">
                
                <div class="login-form-1">
                    {errors && <p>{errors}</p>}

             
                    <h3>Create Account</h3>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <input type="text" name="firstname" class="form-control" placeholder="First Name "
                                // value={ formValues.firstname}
                                // onChange={handleChange}
                                onChange={e=>setFirstname(e.target.value)} 
                            />
                        </div><br/>
                        {/* <p>{formErrors.firstname}</p> */}
                        <div class="form-group">
                            <input type="text" name="lastname" class="form-control" placeholder="Last Name"
                            //  value={ formValues.lastname}
                            //  onChange={handleChange}
                             onChange={e=>setLastname(e.target.value)}
                             />
                        </div>
                        <br/>
                        {/* <p>{formErrors.lastname}</p> */}
                        <div class="form-group">
                            <input type="text"  name="middlename" class="form-control" placeholder="Middle Name" 
                                // value={ formValues.middlename}
                                // onChange={handleChange}
                                onChange={e=>setMiddle(e.target.value)}
                                />
                        </div>
                        <br/>
                        {/* <p>{formErrors.middlename}</p> */}
                        <div class="form-group">
                            <input type="number" name="phonenumber" class="form-control" placeholder="Phone Number" 
                            //    value={ formValues.phonenumber}
                            //    onChange={handleChange}
                                onChange={e=>setPhonenumber(e.target.value)} 
                                />
                        </div><br/>
                        {/* <p>{formErrors.phonenumber}</p> */}
                        <div class="form-group">
                            <input type="number" name="idnumber" class="form-control" placeholder="ID Number"
                            //    value={ formValues.idnumber}
                            //    onChange={handleChange}
                                onChange={e=>setIdnumber(e.target.value)}
                                />
                        </div><br/>
                        {/* <p>{formErrors.idnumber}</p> */}
                        <div class="form-group">
                            <input type="text" name="email" class="form-control" placeholder="Your Email"
                            //    value={ formValues.email}
                                // onChange={handleChange}
                                onChange={e=>setEmail(e.target.value)}
                                />
                        </div><br/>
                        {/* <p>{formErrors.email}</p> */}
                        <div class="form-group">
                            <input type="password" name="password" class="form-control" placeholder="Your Password"
                            //    value={ formValues.password} 
                            //    onChange={handleChange}
                                onChange={e=>setPassword(e.target.value)} 
                                />
                        </div><br/>
                        {/* <p>{ formErrors.password}</p> */}
                        <div class="form-group">
                            <button type="submit" class="btnSubmit">Create Account</button>
                        </div><br/>

                    </form>
                </div>
                </div>
                </div>
        </div>
    )
}

export default Register;