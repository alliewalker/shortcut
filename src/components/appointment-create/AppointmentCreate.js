import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import APIUrl from '../../helpers/environment';
import './Appointment-create.css';
import { Button as ModalButton, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { log } from 'util';

class AppointmentCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: '',
            service: '',
            stylist: '',
            date: '',
            time: ''
        };
    }

    toggle= () => {
        this.props.onClose()
    }

    handleChange = (event) => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let date= new Date(this.state.date)
        date.setDate(date.getDate() + 1);
        let timeArray= this.state.time.split(':')
        date.setHours(timeArray[0], timeArray[1])
        fetch(`${APIUrl}/appointment/create`, {
            method: 'POST',
            body: JSON.stringify({ 
                service: this.state.service,
                stylist: this.state.stylist,
                date: date
                
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            })
        }).then((res) => res.json())
        .then((logData) => {
            this.props.updateAppointmentArray(logData);
            this.setState({
                service: '',
                stylist: '',
                date: '',
                time: ''
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render(){
        return(
            <Modal isOpen={this.props.visible} id='appcreate'>
               <ModalHeader toggle={this.toggle}>Book an Appointment</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Label htmlFor='service'>Services</Label>
                    <Input type='text' name='service' id='service' value={this.state.service} onChange={this.handleChange} placeholder='Service'>
                    </Input>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor='stylist'>Stylist</label>
                        <Input type='select' name='stylist' id='stylist' value={this.state.stylist} onChange={this.handleChange} placeholder='Stylist'>
                        <option></option>
                        <option>Tatiana</option>
                        <option>Trixie</option>
                        <option>Ludka</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor='Date'>Date and Time</label>
                        <Input id='date' type='date' name='date' value={this.state.date} placeholder='Choose a Date' onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <label htmlFor='Time'>Time</label>
                    <Input id='time' type='time' name='time' value={this.state.time} placeholder='Choose a Time' onChange={this.handleChange}/>
                </FormGroup>
                    <Button type='submit' color='info'>Submit</Button>
                    </Form>
                    </ModalBody>
            </Modal>
        )
    }
}
export default AppointmentCreate;

