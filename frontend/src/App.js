import { useState } from 'react';
import {Box, Button, Typography, TextField, Stack} from '@mui/material';
import './App.css';

const form_fields = {
    userName: "",
    firstName: "",
    address: "",
}

function App() {
  const [form, setForm] = useState(form_fields);
  const [errors, setErrors] = useState({});

  const requiredFields = ['firstName', 'userName'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    requiredFields.forEach(field => {
        if(!form[field]) {
            validationErrors[field] = `${field} is required`;
        }
    })



    if(Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    try {
        const response = await fetch(`http://localhost:8001/new`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const _response = await response.json();
        if(response.ok) {
            console.log(_response.message);
            setErrors({});
        } else {
            console.log(_response.error);

        }

    } catch (error) {
        console.log(error)
    }
  }
  return (
      <Box sx={{alignItems: 'center'}}>
    <div className="App">
      <Typography sx={{marginTop: 3}}>Validation Form</Typography>
        <Box sx={{m: 3, width: '500px'}}>
      <form onSubmit={handleSubmit} noValidate>


              <Stack direction='column' spacing={2}>
                  <TextField
                      label="username"
                      value={form.userName}
                      onChange={(e) => {
                          setForm({
                              ...form,
                              userName: e.target.value,
                          })
                      }}
                      required
                      error={!!errors.userName}
                  />

                  <TextField
                      label="first name"
                      value={form.firstName}
                      onChange={(e) => {
                          setForm({
                              ...form,
                              firstName: e.target.value,
                          })
                      }}
                      required
                      error={!!errors.firstName}
                  />

                  <TextField
                      label="address"
                      value={form.address}
                      onChange={(e) => {
                          setForm({
                              ...form,
                              address: e.target.value,
                          })
                      }}
                  />
              </Stack>

          <Button type="submit">save</Button>
      </form>
        </Box>

    </div>
      </Box>

  );
}

export default App;
