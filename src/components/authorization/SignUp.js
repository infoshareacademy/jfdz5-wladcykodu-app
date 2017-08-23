import React from 'react'
import {Button} from 'react-bootstrap'

const SignUp = () => (

    <div>
        <h1>Sign Up form</h1>
        <form>
            <fieldset className="form-group">
                <label>Email:</label>
                <input className="form-control"/>
            </fieldset>
            <fieldset className="form-group">
                <label>Password:</label>
                <input className="form-control" type="password"/>
            </fieldset>
            <fieldset className="form-group">
                <label>Confirm Password:</label>
                <input className="form-control" type="password"/>
            </fieldset>
            <Button action="submit" bsStyle="success">Sign up!</Button>
        </form>
    </div>
)

export default SignUp
