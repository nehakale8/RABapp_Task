import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios"
import '../App.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const baseUrl="http://localhost:5000"


function Movements() {
  const[eventsList, setEventsList]=useState([]);
  const [addFormData, setAddFormData] = useState({
    company: "",
    reason: "",
    species: "",
    dest_premise_id: "",
    start_date: "",
    moved_count: "",
    origin_premise_id: "",
  });


  const fetchEvents=async()=>{
    const data=await axios.get(`${baseUrl}/movements`)
    const {events}=data.data
    setEventsList(events);
  }

  useEffect(()=>{
    fetchEvents();
  }, [])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("id");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = async(event) => {
    event.preventDefault();
    const data=await axios.post(`${baseUrl}/movements`, addFormData)
    const newContact = {
      species: addFormData.species,
      company: addFormData.company,
      reason: addFormData.reason,
      origin_premise_id:addFormData.origin_premise_id,
      dest_premise_id: addFormData.dest_premise_id,
      moved_count: addFormData.moved_count,
      start_date: addFormData.start_date,
    };
    const newContacts = [...eventsList, newContact];
    setEventsList(newContacts);
    update_population(addFormData)
    handleClose()
  };

  const update_population=async(e)=>{
    const eventId=e.id
    const count=-e.moved_count
    const data=await axios.put(`${baseUrl}/events/${e.origin_premise_id}`, {count})
    
    const updatedEvent=data.data.event;
        const updatedList=eventsList.map(event=>{
          if (event.id==eventId){
            return event=updatedEvent
          }
          return event
        })
        setEventsList(updatedList)
    const count2=e.moved_count
    const data1=await axios.put(`${baseUrl}/events/${e.dest_premise_id}`, {count:count2})
    const updatedEvent2=data1.data.event;
    const updatedList2=eventsList.map(event=>{
      if (event.id==eventId){
        return event=updatedEvent2
      }
      return event
    })
    setEventsList(updatedList2)  }

  return (
    <div className='app-container'>
      <h1>Movements data</h1>

      {/* dialog material ui */}
      <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add movement
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Movement details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="company"
            label="company"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
          <TextField
            autoFocus
            id="reason"
            label="reason"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
          <TextField
            autoFocus
            id="species"
            label="species"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
          <TextField
            autoFocus
            id="origin_premise_id"
            label="origin premise id"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
          <TextField
            autoFocus
            id="dest_premise_id"
            label="dest premise id"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
          <TextField
            autoFocus
            id="moved_count"
            label="moved count"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
          <TextField
            autoFocus
            id="start_date"
            label="start date"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddFormSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Reason</th>
            <th>Species</th>
            <th>Origin Premise ID</th>
            <th>Dest Premise ID</th>
            <th>Start Date</th>
            <th>Moved Count</th>
          </tr>
        </thead>
        <tbody>
          {eventsList.map((event)=>(
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.company}</td>
              <td>{event.reason}</td>
              <td>{event.species}</td>
              <td>{event.origin_premise_id}</td>
              <td>{event.dest_premise_id}</td>
              <td>{event.start_date}</td>
              <td>{event.moved_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Movements;