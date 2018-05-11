import React ,{ Component } from "react";
import axios from 'axios';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from 'material-ui/Checkbox';
import './App.css';
injectTapEventPlugin();




export default class Form extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          email: '',
          password: '',
          phone: '',
          isSubscribe: true,
          nameError: "",
          phoneError: "",
          emailError: "",
          passwordError: ""
        };
      }
      validate = () => {
        let isError = false;
        const errors = {
          nameError: "",
          phoneError: "",
          emailError: "",
          passwordError: ""
        };
    
        if (this.state.name.length < 5) {
          isError = true;
          errors.nameError = "name needs to be at least 5 characters long";
        }

        if (this.state.password.length < 6) {
            isError = true;
            errors.passwordError = "password needs to be at least 5 characters long";
          }
    
        if (this.state.email.indexOf("@") === -1) {
          isError = true;
          errors.emailError = "Requires valid email";
        }
        if (this.state.phone.length <= 8) {
            isError = true;
            errors.phoneError = "Requires valid phone minimum 8 digits";
          }
    
    
        this.setState({
          ...this.state,
          ...errors
        });
    
        return isError;
      };
    
      handleSubmit = (e) => {
        e.preventDefault();

    
     

    const err = this.validate();
    if (!err) {
      // clear form
      this.setState({
        name: '',
        email: '',
        password: '',
        phone: '',
        isSubscribe: true,
        nameError: "",
        phoneError: "",
        emailError: "",
        passwordError: ""
      });
 
    }

    const user = {
        name: this.state.name,
        email : this.state.email,
        password: this.state.password,
        isSubcribe: this.state.isSubscribe
           }

    axios.post('https://g5xirepb1j.execute-api.eu-west-2.amazonaws.com/dev/post-test', { user })
   
    .then(res => {
        console.log(res.data);
    })
    .catch(error => {
        console.log(error)
    });

    // const url='https://cors-anywhere.herokuapp.com/https://g5xirepb1j.execute-api.eu-west-2.amazonaws.com/dev/post-test';
    // const param={
    //     headers: {
    //         "Content-Type":"application/json; charset=UTF-8"
    //     },
    //     body:JSON.stringify(user),
    //     method: "POST"
    // };
    // fetch(url,param)
    // .then(data=>{return data.json()})
    // .then(res=>{console.log(res.data)})
    // .catch(error=>console.log(error))
        }


    
      render() {
        return (
            <MuiThemeProvider>
          <form className='FormStyl' onSubmit={this.handleSubmit}>

            <TextField
            hintText="Name"
         
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            floatingLabelFixed
            errorText={this.state.nameError}
            />
            <br />

            <TextField
            hintText="Email"
            
            value={this.state.email}
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
            floatingLabelFixed
            errorText={this.state.emailError}
            />
            <br />
           
            <TextField
            hintText="Password"
          
            value={this.state.password}
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            floatingLabelFixed
            errorText={this.state.passwordError}
            />
            <br />
            
             <TextField
            hintText="phone"
            
            value={this.state.phone}
            type="number"
            onChange={e => this.setState({ phone: e.target.value })}
            floatingLabelFixed
            errorText={this.state.phoneError}
            />
            <br />
         
          <Checkbox
            label="Interested in opting for marketing emails "
            type="checkbox"
            checked={this.state.isSubscribe}
            onCheck={()=>this.setState({ isSubscribe: !this.state.isSubscribe})}
            />
       
             <br />

            <RaisedButton label="Submit" type="submit" primary />
          </form>
        
          </MuiThemeProvider>
        );
       
      }
    }
