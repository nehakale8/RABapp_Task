import React from 'react';


import {useEffect, useState} from "react";
import axios from "axios"
import {format} from "date-fns";
import Button from '@mui/material/Button';

// import './App.css';

const baseUrl="http://localhost:5000"
function Home() {
  const[address, setAddress]=useState("");
  const[editAddress, setEditAddress]=useState("");
  const[eventsList, setEventsList]=useState([]);
  const[eventId, setEventId]=useState(null);

  const fetchEvents=async()=>{
    const data=await axios.get(`${baseUrl}/events`)
    const {events}=data.data
    setEventsList(events);
  }

  const handleChange=(e, field)=>{
    if (field=="edit"){
      setEditAddress(e.target.value);
    }else{
      setAddress(e.target.value);
    }
    
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if (editAddress){
        const data=await axios.put(`${baseUrl}/events/${eventId}`, {address:editAddress});
        const updatedEvent=data.data.event;
        const updatedList=eventsList.map(event=>{
          if (event.id==eventId){
            return event=updatedEvent
          }
          return event
        })
        setEventsList(updatedList)
      }
      else{
        const data=await axios.post(`${baseUrl}/events`, {address})
        setEventsList([...eventsList, data.data]);
      }
      setAddress('');
      setEditAddress('');
      setEventId(null);

    }catch(err){
      console.error(err.message);
    }
  }

  const handleDelete=async(id)=>{
    try{
      await axios.delete(`${baseUrl}/events/${id}`)
      const updatedList =eventsList.filter(event=>event.id!==id)
      setEventsList(updatedList);

    }catch(err){
      console.error(err.message);
    }
  }

  const toggleEdit=(event)=>{
    setEventId(event.id);
    setEditAddress(event.address);
  }

  useEffect(()=>{
    fetchEvents();
  }, [])


  return (
    <div className="App">
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="address">Address</label>
          <input
            onChange={(e)=>handleChange(e,'description')}
            type="text"
            name="address"
            id="address"
            value={address}
            placeholder="Address of event"
          />
          <Button variant="contained" type='submit'>Submit</Button>
          {/* <button type='submit'>Submit</button> */}
        </form>
      </section>
      <section>
        <ul>
          {
            eventsList.map(event=>{
              if(eventId==event.id){ 
                return(
                  <li>
                  <form onSubmit={handleSubmit} key={event.id}>
                    <input
                      onChange={(e)=>handleChange(e, 'edit')}
                      type="text"
                      name="editAddress"
                      id="editAddress"
                      value={editAddress}
                    />
                    <Button variant="contained" type='submit'>Submit</Button>
                    {/* <button type="submit">Submit</button> */}
                  </form>
                </li>
                )
              }
              else{
                return(
                  <li style={{display:"flex"}} key={event.id}>
                    {event.id}  = {event.address}
                    <Button variant="contained" onClick={()=>toggleEdit(event)}>Edit</Button>
                    <Button variant="contained" onClick={()=>handleDelete(event.id)}>Delete</Button>

                    {/* <button onClick={()=>toggleEdit(event)}>Edit</button>
                    <button onClick={()=>handleDelete(event.id)}>Delete</button> */}
                  </li>
                )
              }
            })
          }
        </ul>
      </section>
    </div>
  );
}


export default Home;