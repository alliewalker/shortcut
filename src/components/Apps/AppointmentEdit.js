import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';


class AppointmentEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            service: '',
            stylist: '',
            date: '',
            time: ''
        };
    }

    toggle= () => {
        this.props.onClose()
    }

    componentWillMount() {
        this.setState({
            id: this.props.appointment.id,
            service: this.props.appointment.service,
            stylist: this.props.appointment.stylist,
            date: this.props.appointment.date
            })
        }

    handleChange = (event) => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.visible} >
                    <ModalHeader toggle={this.toggle}>Update your appointment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Label for="service">Service</Label>
                                <Input id="service" type="text" name="service" value={this.state.service} onChange={this.handleChange} placeholder="Enter a Service" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="stylist">Stylist</Label>
                                <Input type="select" id="stylist" name="stylist" value={this.state.stylist} onChange={this.handleChange} placeholder="Choose a Stylist" >
                                    <option></option>
                                    <option>Tatiana</option>
                                    <option>Trixie</option>
                                    <option>Ludka</option>
                                    </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="date">Date</Label>
                                <Input id="date" type="date" name="date" value={this.state.date} onChange={this.handleChange} placeholder="Select a Date" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="time">Time</Label>
                                <Input id="time" type="time" name="time" value={this.state.time} onChange={this.handleChange} placeholder="Choose a Time" />
                            </FormGroup>
                            <Button type="submit" color="primary"> Submit </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}



export default AppointmentEdit;