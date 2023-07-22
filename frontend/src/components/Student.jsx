import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';

export default function Student() {
    const paperStyle = {padding: '50px 20px' , margin:"20px auto"}
    const [name,setName] = React.useState("")
    const [address,setAddress] = React.useState("")
    const [student,setStudent] = React.useState("")
    const handleClick = (e) => {
        const student = {name,address}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("New student added")
        }).catch((e)=>{
            console.log(e)
        })
        setName('')
        setAddress('')
    }
    React.useEffect(() => {
        fetch("http://localhost:8080/student/getAll").then(
            res => res.json()
        ).then(result => {
            setStudent(result)
        })
    }, [student])
    return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
        <h1 style={{color: "blue"}}><u>Add Student</u></h1>
    <Box
        component="form"
        sx={{
        '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
    >
        <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth value={name} onChange={(e)=>setName(e.target.value)} placeholder='Vasi'/>
        <TextField id="outlined-basic" label="Student address" variant="outlined" fullWidth value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Chennai'/>
        <Button variant="contained" color="success" onClick={handleClick}>Add</Button> 
    </Box>
    </Paper>
    <Paper elevation={3} style={paperStyle}>
        <h1>Student Details</h1>
        {
            student && student.map((student) => (
                <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
                    Id:{student.id}<br/>
                    Name:{student.name}<br/>
                    Address:{student.address}
                </Paper>
            )
            )
        }
    </Paper>
    </Container>
    );
}
