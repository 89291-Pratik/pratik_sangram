
// import { Button, Grid, TextField } from '@mui/material'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { getUser, login } from '../../State/Auth/Action'

// const Login = () => {
//     const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const jwt=localStorage.getItem("jwt")
//     const {auth}=useSelector(store=>store)


//     useEffect(() => {
//         if (jwt) {
//             console.log(jwt)
//             dispatch(getUser(jwt)); // Dispatch only if JWT is present
//         }
//     }, [jwt, auth.jwt]); // Listen for auth.jwt changes

import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { loginUser, getUserProfile } from '../../store/slices/authSlice'

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate=useNavigate();
    const jwt=localStorage.getItem("jwt")
    const { isLoading, error, jwt: authJwt } = useAppSelector(state => state.auth);


    useEffect(() => {
        if (jwt) {
            console.log(jwt)
            dispatch(getUserProfile(jwt)); // Dispatch only if JWT is present
        }
    }, [jwt, authJwt, dispatch]); // Listen for auth.jwt changes

    
//     const handleSubmit=(event)=>{
//         event.preventDefault();

//         const data=new FormData(event.currentTarget);

//         const userData={
           

//             email:data.get("email"),
//             password:data.get("password")
//         }
//         dispatch(login(userData))

            email:data.get("email"),
            password:data.get("password")
        }
        dispatch(loginUser(userData))


//         console.log("userData ",userData)
     
//     }
//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
                

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
//                         Login
//                     </Button>
//                 </Grid>

//             </Grid>
//         </form>
//         <div className='flex justify-center flex-col items-center'>
//             <div className='py-3 flex items-center'>
//                 <p>if you don't have account ?</p>
//                 <Button onClick={()=>navigate("/register")} className='ml-5' size="small">Register</Button>

//             </div>
//         </div>
//     </div>
//   )
// }

// export default Login

import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, login } from '../../State/Auth/Action';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector(store => store);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Handle auth redirect
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  // Email regex
  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  // Password validation
  const validatePassword = (password) => {
    return password.length >= 6; // You can make this more complex as needed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Live validation
    if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) ? '' : 'Invalid email format' });
    }
    if (name === 'password') {
      setErrors({ ...errors, password: validatePassword(value) ? '' : 'Password must be at least 6 characters' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formData;

    // Final validation check before dispatch
    const newErrors = {
      email: !validateEmail(email) ? 'Invalid email format' : '',
      password: !validatePassword(password) ? 'Password must be at least 6 characters' : '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasErrors) return;

    dispatch(login({ email, password }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
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
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className='bg-[#9155FD] w-full'
              type='submit'
              variant="contained"
              size='large'
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

 
      <div className='flex justify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          <p>Don't have an account?</p>
          <Button onClick={() => navigate("/register")} className='ml-5' size="small">Register</Button>

                <Grid item xs={12} >
                    <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                     fullWidth
                     autoComplete='email'/>
                </Grid>
                <Grid item xs={12} >
                    <TextField
                    required
                    id="password"
                    name="password"
                    label="Password"
                     fullWidth
                     autoComplete='password'/>
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <div className="text-red-500 text-sm">{error}</div>
                    </Grid>
                )}
                <Grid item xs={12} >
                    <Button 
                    className='bg-[#9155FD] w-full'
                    type='submit'
                    variant="contained"
                    size='large'
                    disabled={isLoading}
                    sx={{padding:".8rem 0",bgcolor:"#9155FD"}}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </Grid>

            </Grid>
        </form>
        <div className='flex justify-center flex-col items-center'>
            <div className='py-3 flex items-center'>
                <p>if you don't have account ?</p>
                <Button onClick={()=>navigate("/register")} className='ml-5' size="small">Register</Button>

            </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
