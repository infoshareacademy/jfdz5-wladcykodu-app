import React from 'react'
import {Button} from 'react-bootstrap'

const SignUp = () => (

    <div>
        <h1>Sign Up form</h1>
        <form>
            <fieldset className="form-group">
                <label>Full Name:</label>
                <input className="form-control" placeholder="Name Surname"  />
            </fieldset>
            <fieldset className="form-group">
                <label>Email:</label>
                <input className="form-control" placeholder="youremailhere@example.com"  />
            </fieldset>
            <fieldset className="form-group">
                <label>Password:</label>
                <input className="form-control" type="password" placeholder="*******" />
            </fieldset>
            <fieldset className="form-group">
                <label>Confirm Password:</label>
                <input className="form-control" type="password" placeholder="*******" />
            </fieldset>
            <Button action="submit" bsStyle="success">Sign up!</Button>
        </form>
    </div>
)

export default SignUp
