import React from 'react';
import './Display.css';
import EventCard from './EventCard.js'

function CardString(props){
  return(
  <div id="CardString">
    <EventCard place={props.place}/>
  </div>
  )
}

export default CardString;