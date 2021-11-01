import { useEffect } from 'react';
import {
    Avatar,
    Container,
    CssBaseline,
    Box,
    TextField,
    Button, 
    Grid, 
    // Link, 
    CircularProgress 
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { loginAction } from './reducers/loginReducers';
import { UserFormSubmit } from './loginTypes'

const validationSchema = yup
  .object({
    email: yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
  })
  .required();


const Login = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state : RootState) => state.login )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormSubmit>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema)
  });
  
  const onSubmit = (data: UserFormSubmit): void => {
    dispatch(loginAction(data))
  }


  /* istanbul ignore next */
  useEffect(() => {
    if(auth.login) {
        setTimeout(() => {
            window.location.href = '/dashboard'
        }, 1000);
    }
  }, [auth.login]);

  
  return (
    <>
      <Navbar/>
      <div className="container-height">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#1b4559' }}>
              <ExitToAppIcon />
            </Avatar>

            <div >
              <h1>Sign In for Vendor</h1>
            </div>

            <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                {...register('email', { required: true })}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
                {...register('password', { required: true })}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="medium"
              >
                Sign In 
                
                { /* istanbul ignore next */
                  auth.loading && <CircularProgress  size={30} color="inherit" style={{marginLeft: 10}} /> }
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="/forgot-password">
                    Forgot password?
                  </Link> */}
                </Grid>
              </Grid>
            </form>
            </Box>
          </Box>
        </Container>
      </div>
      <Footer/>
    </>
    )
}

export default Login;
