import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from "../../firebase";
import md5 from 'md5';

class Register extends React.Component {
state = {
    username: '',
    email: '',
    password: '',
    passwordConfermation: '',
    errors: []
    loading: false
};



    isFormValid = () => {
        let errors = [];
        let error;


        if(this.isFormEmpty) {
            //throw error
            error= { mesage: 'Fill in all fields'};
            this.setState({ errors: errors.concat(error)})
            return false;
        } else if (this.isPasswordValid(this.state)) {
            //throw error
            error = { message: 'Password is invalid'};
            this.setState({ error: errors.concat(error)});
            return false;
        } else {
            //form Valid
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, passwordConfermation }) =>{
        return !username.legnth || !email.legnth || !password.legnth || !passwordConfermation.legnth;
    }

    isPasswordValid =({password, passwordConfermation}) => {
        if (password.legnth < 6 ||passwordConfermation.legnth < 6 ) {
            return false;
        } else if (password !== passwordConfermation) {
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i ) => <p key={i} >{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        if(this.formValid()) {}
        this.setState({errors: [], loading: true })
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(createUser =>{
                console.log(createUser);
                createdUser.user.updateProfile({
                    displayname: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`})
            })
            .then(() => {
                    this.setState({ loading: false });
            })
            .catch(err =>{
                console.log(err);
                this.setState({errors: this.state.errors.concat(err), loading: false });
            })
            .catch(err => {
                console.error(err);
                this.setState({errors: this.state.errors.concat(err),loading: false})
            })

    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputname)
        )
            ? "error"
            : ""

        className={errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : '' }
    }



    render() {
        const { username, email, password, passwordConfermation, errors, loading } = this.state
  return (
        <Grid textAlign="center" verticalAlign="middle" className="app" >
        <Grid.Column style={{ maxWidth: 450}}>
            <Header as="h2" icon color="orange" textAlign="center">
                <Icon name="puzzle piece" color="orange" />
                Register for DevChat
            </Header>
            <Form size="large" onSubmit={this.handleSubmit} >
                <Segment stacked>
                <Form.Input fluid name="username" icon="user" iconPosition="left" 
                placeholder="Username" onChange={this.handleChange} value={username} type="text" 
                className={this.handleInputError = (errors, 'text')}/>

                <Form.Input fluid name="email" icon="mail" iconPosition="left" 
                placeholder="Email Address" onChange={this.handleChange} value={email} type="email" 
                // className={errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : '' } 
                className={this.handleInputError = (errors, 'email')}/>

                 <Form.Input fluid name="password" icon="lock" iconPosition="left" 
                placeholder="Password" onChange={this.handleChange}  value={password} type="password" 
                className={this.handleInputError = (errors, 'password')}/>

                <Form.Input fluid name="passwordConfermation" icon="repeat" iconPosition="left" 
                placeholder="Password Confirmation" onChange={this.handleChange}  value={passwordConfermation} type="password" 
                className={this.handleInputError = (errors, 'password')}/>

                <Button className={loading ? 'loading' : ''} color="orange" fluid size="large" >Submit</Button>

                <Message>Already a User? <Link to="/login" >Login</Link></Message>



                </Segment>
            </Form>
            {this.state.errors.length > 0 && (
                <message error>
                    <h3>Error</h3>
                    {this.displayErrors(this.state.errors)}
                </message>
            )}
        </Grid.Column>
            
        </Grid>

  );
}
}
export default Register;
