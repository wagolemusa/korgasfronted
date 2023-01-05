import React from 'react'
import { Link } from "react-router-dom";

function RegisterSuccessfully() {
    return (
        <div>
            <div class="container login-container">
                <div class="row">
                    <div class="login-form-1">
                        <h2>Your account is created successfully</h2>
                            <h4>Please Validate Email Account</h4>
                            <Link to="/" class="btn btn-primary">Navigate to Home</Link>

                        </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterSuccessfully;