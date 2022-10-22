import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios"
import '../App.css';

const baseUrl="http://localhost:5000"


function Movements() {
  const[eventsList, setEventsList]=useState([]);

  const fetchEvents=async()=>{
    const data=await axios.get(`${baseUrl}/movements`)
    const {events}=data.data
    setEventsList(events);
  }

  useEffect(()=>{
    fetchEvents();
  }, [])


  return (
    <div className='app-container'>
      <h3>Movements data</h3>
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