import React from 'react'
import {Button} from 'react-bootstrap'

class SignIn extends React.Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <div>
                <h1>Sign In form</h1>
                <form>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <input className="form-control" placeholder="youremailhere@example.com"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="*******"/>
                    </fieldset>
                    <Button action="submit" bsStyle="success">Sign in</Button>
                </form>
            </div>
        )
    }

}

export default SignIn
