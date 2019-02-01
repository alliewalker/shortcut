import React from 'react';
import { Table, Button } from 'reactstrap';
import './AppointmentTable.css';


const AppointmentTable = (props) => {
    
return(
    <div>
        <div className="heading">
        <h3><b>Your Appointments</b></h3>
        
         </div>
        <Table striped>

            <thead id="thead">
                <tr>
                <th>I.D.</th>
                <th>TIME</th>
                <th>DATE</th>
                <th>STYLIST</th>
                <th>SERVICE</th>
                <th></th>
                <th/>

            </tr>
            </thead>
            <tbody id="tbody">
                {
                    props.appointments.map((appointment, id) => {   
                        let date = new Date(appointment.date)
                        return(
                            <tr key={id}>
                            <th scope='row'>{appointment.id}</th>
                            <td>{date.getHours()%12}:{formatMinutes(date.getMinutes())}</td>
                            <td>{MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</td>
                            <td>{appointment.stylist}</td>
                            <td>{appointment.service}</td>
                            <td>
                            
                            <Button id={appointment.id} onClick={e => props.update(e, appointment)} color='info'>Update</Button>
                            <Button id={appointment.id} onClick={props.delete} color='danger'>Cancel</Button>
                        
                            
                            </td>
                            <td/>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
        <br/>
        <Button id="newButton" onClick={ props.buttonClicked }>Book an Appointment</Button>
    </div>
    );
}

export default AppointmentTable;

const MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
function formatMinutes(minutes) {
    
    if (minutes < 10) {
        return '0' + minutes;
    }
  return minutes 
 };


