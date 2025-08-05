// import { Button, Grid, TextField } from '@mui/material'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getUser, register } from '../../State/Auth/Action';
// import { store } from '../../State/store';



// const Register = () => {

//     const navigate=useNavigate();
//     const dispatch=useDispatch();
//    //const jwt=localStorage.getItem("jwt")
//     const {auth}=useSelector(store=>store)

//     // useEffect(()=>{
//     //        if(jwt){
//     //     dispatch(getUser(jwt))
//     //        }
//     // },[jwt,auth.jwt])

    
//     const handleSubmit=(event)=>{
//         event.preventDefault();

//         const data=new FormData(event.currentTarget);

//         const userData={
//             firstName:data.get("firstName"),
//             lastName:data.get("lastName"),
//             email:data.get("email"),
//             password:data.get("password")
//         }
//         dispatch(register(userData))

//         console.log("userData ",userData)
     
//     }
//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                     required
//                     id="firstName"
//                     name="firstName"
//                     label="First Name"
//                      fullWidth
//                      autoComplete='given-name'/>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                     required
//                     id="lastName"
//                     name="lastName"
//                     label="Last Name"
//                      fullWidth
//                      autoComplete='given-name'/>
//                 </Grid>
//                 <Grid item xs={12} >
//                     <TextField
//                     required
//                     id="email"
//                     name="email"
//                     label="Email"
//                      fullWidth
//                      autoComplete='email'/>
//                 </Grid>
//                 <Grid item xs={12} >
//                     <TextField
//                     required
//                     id="password"
//                     name="password"
//                     label="Password"
//                      fullWidth
//                      autoComplete='password'/>
//                 </Grid>
//                 <Grid item xs={12} >
//                     <Button 
//                     className='bg-[#9155FD] w-full'
//                     type='submit'
//                     variant="contained"
//                     size='large'
//                     sx={{padding:".8rem 0",bgcolor:"#9155FD"}}>
//                         Register
//                     </Button>
//                 </Grid>

//             </Grid>
//         </form>
//         <div className='flex justify-center flex-col items-center'>
//             <div className='py-3 flex items-center'>
//                 <p>if you have already account ?</p>
//                 <Button onClick={()=>navigate("/login")} className='ml-5' size="small">Login</Button>

//             </div>
//         </div>
//     </div>
//   )
// }

// export default Register

import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../State/Auth/Action';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Handle field change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear error for field
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  // Form validation
 const validate = () => {
  const newErrors = {};
  const nameRegex = /^[A-Za-z]{2,}$/; // Only letters, at least 2 characters
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!nameRegex.test(formData.firstName)) {
    newErrors.firstName = 'First name must be at least 2 letters and contain no numbers';
  }

  if (!nameRegex.test(formData.lastName)) {
    newErrors.lastName = 'Last name must be at least 2 letters and contain no numbers';
  }

  if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Invalid email address';
  }

  if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    dispatch(register(formData));
    console.log('Registering user:', formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: '.8rem 0', bgcolor: '#9155FD' }}
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center mt-4">
        <div className="py-3 flex items-center">
          <p>If you already have an account?</p>
          <Button onClick={() => navigate('/login')} className="ml-2" size="small">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;

