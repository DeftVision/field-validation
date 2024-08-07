import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import './App.css';

const form_fields = {
  userName: ""
}

function App() {
  const [form, setForm] = useState(form_fields);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();


    let validationErrors = {};
    if(!form.userName) {
        validationErrors.userName = 'username is required';
    }

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
    <div className="App">
      <Typography sx={{marginTop: 3}}>Validation Form</Typography>

      <form onSubmit={handleSubmit} noValidate>

          <Box sx={{marginTop: 3, marginBottom: 3}}>
              <TextField
                  label="username"
                  value={form.userName}
                  onChange={(e) => {
                      setForm({
                          ...form,
                          userName: e.target.value,
                      })
                  }}
                  error={!!errors.userName}

              />
          </Box>
          <Button type="submit">save</Button>
      </form>
    </div>
  );
}

export default App;
