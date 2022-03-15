import React from 'react';
//import React, { useState } from 'react';
var footerstyle={
    bottom: 0,
    position:"fixed",
    width:"100%"
}   
export default function Footer() {
  // Declare a new state variable, which we'll call "count"
 // const [count, setCount] = useState(0);

  return (
    <footer className="text-center text-lg-start bg-light text-muted" style={footerstyle}>
    <div className="text-center p-4">
      © 2022 Copyright:
      <a className="text-reset fw-bold" href="https://SJSU.com/">SJSU</a>
    </div>
  </footer>
  );
}