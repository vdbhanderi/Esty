import React, { useEffect, useState } from 'react';
//import React, { useState } from 'react';
var footerstyle = {
  bottom: 0,
  position: "fixed",
  width: "100%"
}
var currencyStyle = {
  "marginLeft":"50px",
  "marginTop":"10px"
}
export default function Footer(props) {

  // Declare a new state variable, which we'll call "count"
const currencyUpdate=(e)=>{
   props.onChange(e.target.value)
}

  return (
    <footer className="text-center text-lg-start bg-light text-muted" style={footerstyle}>
      <div className='row'>
        <div className="form-group col-md-2" style={currencyStyle}>
          <label className="small mb-1" htmlFor="country">Currency</label>
          <select id="country" name='country' className="form-control" onChange={currencyUpdate}>
            <option defaultValue="USA" value="$">$ - USA Dollars</option>
            <option key='India' value="₹">₹ - Rupees</option>
            <option key="Brazil" value="£">£ - Pounds</option>
          </select>
        </div>
      </div>

      <div className="text-center p-4">
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="https://SJSU.edu/">SJSU</a>
      </div>
    </footer>
  );
}