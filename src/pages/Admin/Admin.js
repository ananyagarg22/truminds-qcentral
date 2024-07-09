import './Admin.css';

import React from 'react'

function admin() {
  return (
    <div id='users'>
        <div id='heading'>
            <b>General Admission - Users</b>
        </div>
        <div id='headingplusbuttons'>
            <h1> Users </h1>
            <div id='buttons-admin'>
                <button id='add-button'> Add </button>
                <button id='enableQ'> Enable Users for Q </button>
            </div>
            <div id='search-admin'>
                
            </div>

        </div>
    </div>
  )
}

export default admin