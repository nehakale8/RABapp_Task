import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios"
import '../App.css';

const baseUrl="http://localhost:5000"


function Population() {
  const[eventsList, setEventsList]=useState([]);

  const fetchEvents=async()=>{
    const data=await axios.get(`${baseUrl}/events`)
    const {events}=data.data
    setEventsList(events);
  }

  useEffect(()=>{
    fetchEvents();
  }, [])


  return (
    <div className='app-container'>
      <h1>Population data</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Premise ID</th>
            <th>Postal Code</th>
            <th>Total Animal Count</th>
          </tr>
        </thead>
        <tbody>
          {eventsList.map((event)=>(
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.address}</td>
              <td>{event.city}</td>
              <td>{event.state}</td>
              <td>{event.lat}</td>
              <td>{event.lon}</td>
              <td>{event.premise_id}</td>
              <td>{event.postalcode}</td>
              <td>{event.total_animal_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Population;