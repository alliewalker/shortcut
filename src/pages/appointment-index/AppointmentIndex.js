import React from 'react';
import AppointmentCreate from '../../components/appointment-create/AppointmentCreate';
import AppointmentEdit from '../../components/Apps/AppointmentEdit';
import AppointmentTable from '../../components/Apps/AppointmentTable';
import APIUrl from '../../helpers/environment';
// import { Container, Row, Col } from 'reactstrap';

class AppointmentIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      appointments: [],
      updatePressed: false,
      appointmentToUpdate: {},
      showCreateModal: false,
      showEditModal: false,
      appointmentUpdate: {}
    }
  }

  componentDidMount() {
    this.fetchAppointments()
  }

  //Get all
  fetchAppointments = () => {
    fetch(`${APIUrl}/appointment/all`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      })
    })
    .then((res) => {
        return res.json()
      })
    .then((logData) => {
      if(logData instanceof Array) {
        this.setState({ appointments: logData })
      }
    }).catch(error => console.error(error))
  }

  //Update
  appointmentUpdate = (event, Appointment) => {
    let date= new Date(Appointment.date)
    date.setDate(date.getDate() + 1);
    let timeArray= Appointment.time.split(':')
    date.setHours(timeArray[0], timeArray[1])
    fetch(`${APIUrl}/appointment/update/${Appointment.id}`, {
      method: 'PUT',
      body: JSON.stringify({ 
          appointment: {
              
            service: Appointment.service,
            stylist: Appointment.stylist,
            date: date.toISOString()
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      })
    })
    .then((res) => {
      this.setState({ updatePressed: false })
      this.fetchAppointments();
    })
    .catch(err => console.log(err))
  }

  setUpdatedAppointment = (event, Appointment) => {
    this.setState({
        AppointmentToUpdate: Appointment,
        updatePressed: true
    })
  }

  //Delete
  appointmentDelete = (event) => {
    let appointmentId = event.target.id
    fetch(`${APIUrl}/appointment/cancel/${appointmentId}`, {
      method: 'DELETE',
      body: JSON.stringify({ Appointment: {
        service:this.state.service,
        stylist:this.state.stylist,
        date:this.state.date
        }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token')
      })
    })
    .then((res) => this.fetchAppointments())
  }

  showEditModal = (event, appointment) => {
    console.log(appointment)
    this.setState({
      showEditModal: true,
      appointmentUpdate: appointment
    })
  }

  updateAppointmentArray = (newAppointment) => {
    this.fetchAppointments()
  }

  render() {
    const editModal = this.state.showEditModal === true ? <AppointmentEdit visible={ this.state.showEditModal } onClose= { () => this.setState ({ showEditModal: false }) } update= {this.appointmentUpdate} appointment={this.state.appointmentUpdate}/> : <div></div>
       return (
        <div>
        {/* <Container>
          <Row>
            <Col md="4">
              <AppointmentCreate token={this.props.token} updateAppointmentsArray={this.fetchAppointments} />
            </Col>
            <Col md="9">
              {this.state.appointments}
            </Col>
          </Row>
          <Col md="12">  
            {
              this.state.updatePressed ? <AppointmentEdit updatePressed={this.state.updatePressed} update={this.appointmentUpdate} appointments={this.state.appointmentToUpdate} />
              : <div></div>
            }
          </Col>
        </Container> */}
        <AppointmentTable appointments={this.state.appointments} buttonClicked={ () => this.setState({ showCreateModal: true }) } delete={ this.appointmentDelete } update={ this.showEditModal } updatedAppointment= {this.setUpdatedAppointment}/>
        <AppointmentCreate visible={ this.state.showCreateModal } onClose={ () => this.setState({ showCreateModal: false}) } updateAppointmentArray={ this.updateAppointmentArray }/>
        {/* <AppointmentEdit visible={ this.state.showEditModal } onClose={ () => this.setState ({ showEditModal: false }) } update={this.appointmentUpdate} appointment={this.state.appointmentUpdate}/> */}
        {editModal}
        </div>
      )
  }
}

export default AppointmentIndex;