// import React, { useState } from 'react';
// import axios from 'axios';
 
 
// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'http://localhost:8000/register',
//         {
//           username: username,
//           email: email,
//           plainPassword: password,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/ld+json',
//           },
//         }
//       );
//       setSuccessMessage(response.data.message);
//       setUsername('');
//       setEmail('');
//       setPassword('');
//     } catch (error) {
//       if (error.response && error.response.data.errors) {
//         setErrorMessage(error.response.data.errors.join(', '));
//       } else {
//         setErrorMessage('An error occurred during registration.');
//       }
//     }
//   };
 
//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//       <div>
//           <label>username:</label>
//           <input
//             type="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
 
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
       
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };
 
// export default Register;
 
 