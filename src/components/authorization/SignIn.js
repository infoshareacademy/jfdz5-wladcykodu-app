import React from 'react'
import {Button} from 'react-bootstrap'

const SignIn = () => (

    <div>
        <h1>Sign In form</h1>
        <form>
            <fieldset className="form-group">
                <label>Email:</label>
                <input className="form-control"/>
            </fieldset>
            <fieldset className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control"/>
            </fieldset>
            <Button action="submit" bsStyle="success">Sign in</Button>
        </form>
    </div>
)

export default SignIn
