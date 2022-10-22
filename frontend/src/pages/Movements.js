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
    species: "",
    company: "",
    reason: "",
  });
  const[eventId, setEventId]=useState(null);


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
    // console.log(fieldName, fieldValue)
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      species: addFormData.species,
      company: addFormData.company,
      reason: addFormData.reason,
    };
    const newContacts = [...eventsList, newContact];
    setEventsList(newContacts);
    console.log("submit ", newContacts)
    handleClose()
  };

  return (
    <div className='app-container'>
      <h3>Movements data</h3>

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
            id="species"
            label="species"
            type="text"
            variant="outlined"
            onChange={handleAddFormChange}
          />
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
            <tr>
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