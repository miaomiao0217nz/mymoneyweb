import axios from 'axios'
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

const nullable = (v) => {
  if (v === null || v === undefined)
    return ''
  return v;
}

// ----------------------------------------------------------------------

export default function SignupView() {
  const theme = useTheme();
  const router = useRouter();
  const [user, setUser] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleClick = () => {
    axios.post("/register", user).then(resp => {
      localStorage.setItem("token", resp.data);
      setTimeout(() => router.push('/'),500);
    });
  };

  const updateUser = (name, value) => {
    const u = { ...user };
    u[name] = value;
    setUser(u);
    if(u.password!==u.password2)
      setErrorMessage("password miss-mtach");
    else 
      setErrorMessage(null);
  }


  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Stack spacing={3}>

            <TextField name="firstName" label="First Name" value={nullable(user.firstName)} onChange={(e) => updateUser('firstName', e.target.value)} />
            <TextField name="lastName" label="Last Name" value={nullable(user.lastName)} onChange={(e) => updateUser('lastName', e.target.value)} />
            <TextField name="email" label="Email address" value={nullable(user.email)} onChange={(e) => updateUser('email', e.target.value)} />
            <TextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={nullable(user.password)} onChange={(e) => updateUser('password', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="password2"
              label="Repeat Password"
              type={showPassword2 ? 'text' : 'password'}
              value={nullable(user.password2)} onChange={(e) => updateUser('password2', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                      <Iconify icon={showPassword2 ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && <Typography variant="h6" color='red'>{errorMessage}</Typography>}

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              onClick={handleClick}
            >
              Sign up
            </LoadingButton>
          </Stack>


        </Card>

      </Stack>
    </Box>
  );
}
