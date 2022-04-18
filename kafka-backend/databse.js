const mysql = require('mysql');
const con=mysql.createPool({
    host:"estynewdb.cb1ycgh0w0rf.us-east-1.rds.amazonaws.com",
    user:'admin',
    password:"Phoneb00k",
    port:3306,
    database:"esty",

})
// con.getConnection(error => {
//     if (error) throw error;
//     console.log("Successfully connected to the database.");
//   });
module.exports=con