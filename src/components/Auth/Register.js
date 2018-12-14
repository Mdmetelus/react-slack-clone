import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from "../../firebase";

class Register extends React.Component {
state = {
    username: '',
    email: '',
    password: '',
    passwordConfermation: '',
}





    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(createUser =>{
                console.log(createUser);
            })
            .catch(err => {
                console.error(err);
            })

    }



    render() {
        const {username, email, password, passwordConfermation } = this.state
  return (
        <Grid textAlign="center" verticalAlign="middle" className="app" >
        <Grid.Column style={{ maxWidth: 450}}>
            <Header as="h2" icon color="orange" textAlign="center">
                <Icon name="puzzle piece" color="orange" />
                Register for DevChat
            </Header>
            <Form size="large" onSubmit={this.handleChange} >
                <Segment stacked>
                <Form.Input fluid name="username" icon="user" iconPosition="left" 
                placeholder="Username" onChange={this.handleChange} value={username} type="text" />

                <Form.Input fluid name="email" icon="mail" iconPosition="left" 
                placeholder="Email Address" onChange={this.handleChange} value={email} type="text" />

                 <Form.Input fluid name="password" icon="lock" iconPosition="left" 
                placeholder="Password" onChange={this.handleChange}  value={password} type="password" />

                <Form.Input fluid name="passwordConfermation" icon="repeat" iconPosition="left" 
                placeholder="Password Confirmation" onChange={this.handleChange}  value={passwordConfermation} type="password" />

                <Button color="orange" fluid size="large" >Submit</Button>

                <Message>Already a User? <Link to="/login" >Login</Link></Message>



                </Segment>
            </Form>
        </Grid.Column>
            
        </Grid>

  );
}
}
export default Register;
