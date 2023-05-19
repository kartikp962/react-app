import React from 'react';
import '../App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {

    const [formData, setFormData] = useState({
        name: '',
        number:'',
        email: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({...prevFormData, [name] : value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        
        // Check if user has filled all the input fields
        const {name, number, email} = formData;
        if(!name || !number || !email) {
            alert("Please enter all the required details before accessing the page.")
            return
        }

        localStorage.setItem('formData', JSON.stringify(formData));

        setFormData({name: '', number: '', email: ''});

        navigate('/secondPage')

        
        
    }

  return (
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                    id="outlined-required"
                    label="Name"
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    />

                    <TextField
                    id="outlined-number"
                    label="Phone Number"
                    type="number"
                    name='number'
                    value={formData.number}
                    onChange={handleInputChange}
                    />

                    <TextField
                    id="outlined-required"
                    label="Email"
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                    
                    <Button 
                    variant='outlined'
                    type='submit'
                    >
                        Submit
                    </Button>
                </div>
        
            </Box>
  );
}




































// import React from 'react'

// function LoginPage() {
//   return (
//     <div>
//         <form>
//             <label>
//                 Name
//             </label>
//             <input
//             type='text' placeholder='Enter your name'
//             />

//             <label>
//                 Phone Number
//             </label>
//             <input
//                 type='number'
//                 placeholder='Enter your phone number'
//             />

//             <label>
//                 Email
//             </label>
//             <input
//                 type='email'
//                 placeholder='Enter your email'
//             />

//             <button>Submit</button>
//         </form>
//     </div>
//   )
// }

// export default LoginPage