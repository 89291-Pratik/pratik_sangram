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
    
    const handleSubmit=(event)=>{
        event.preventDefault();

        const data=new FormData(event.currentTarget);

        const userData={
           
            email:data.get("email"),
            password:data.get("password")
        }
        dispatch(loginUser(userData))

        console.log("userData ",userData)
     
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                

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
  )
}

export default Login