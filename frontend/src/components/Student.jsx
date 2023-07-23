import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, Paper } from "@mui/material";
import DataService from "../services/DataService"; // Import the DataService class

export default function Student() {
    const paperStyle = { padding: "50px 20px", margin: "20px auto" };
    const [name, setName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [edit, setEdit] = React.useState(false);
    const [students, setStudents] = React.useState([]);
    const [editStudentId, setEditStudentId] = React.useState(null);

    const handleEdit = (id) => {
        setEdit(true);
        setEditStudentId(id);

        // Get the student data by ID and set it in the input fields
        const editedStudent = students.find((student) => student.id === id);
        if (editedStudent) {
        setName(editedStudent.name);
        setAddress(editedStudent.address);
        }
    };

    const handleCancelEdit = () => {
        setEdit(false);
        setEditStudentId(null);
        setName("");
        setAddress("");
    };

    const handleClick = React.useCallback(() => {
        const studentData = { name, address };
        console.log(studentData);
        DataService.create(studentData)
            .then(() => {
                console.log("New student added");
                setName("");
                setAddress("");
            })
            .catch((e) => {
                console.log(e);
            });
        }, [name, address]);

    const handleUpdate = (id) => {
        const studentData = { name, address };
        console.log(studentData);
        DataService.update(id, studentData)
        .then(() => {
            console.log("Student information updated");
            setEdit(false);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const handleDelete = (id) => {
        DataService.delete(id)
        .then((response) => {
            console.log(response.data);
            setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== id)
            );
        })
        .catch((error) => {
            console.log(error);
        });
    };

    React.useEffect(() => {
        DataService.getAll()
        .then((response) => {
            setStudents(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [handleClick]);

    return (
        <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{ color: "blue" }}>
            <u>Add Student</u>
            </h1>
            <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField
                id="outlined-basic"
                label="Student Name"
                variant="outlined"
                fullWidth
                
                onChange={(e) => setName(e.target.value)}
                placeholder="Vasi"
            />
            <TextField
                id="outlined-basic"
                label="Student address"
                variant="outlined"
                fullWidth
            
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Chennai"
            />
            <Button variant="contained" color="success" onClick={handleClick}>
                Add
            </Button>
            </Box>
        </Paper>
        <Paper elevation={3} style={paperStyle}>
            <h1>Student Details</h1>
            {students &&
            students.map((student) => (
                <React.Fragment key={student.id}>
                <Paper
                    elevation={6}
                    style={{
                    margin: "10px",
                    padding: "15px",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    }}
                >
                    <div>
                    Name: &nbsp;
                    {edit && editStudentId === student.id ? (
                        <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                        />
                    ) : (
                        <TextField
                        defaultValue={student.name}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        />
                    )}
                    <br />
                    Address: &nbsp;
                    {edit && editStudentId === student.id ? (
                        <TextField
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        variant="standard"
                        />
                    ) : (
                        <TextField
                        defaultValue={student.address}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        />
                    )}
                    </div>
                    <div>
                    {edit && editStudentId === student.id ? (
                        <>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleUpdate(student.id)}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </Button>
                        </>
                    ) : (
                        <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(student.id)}
                        >
                        Edit
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(student.id)}
                    >
                        Delete
                    </Button>
                    </div>
                </Paper>
                </React.Fragment>
            ))}
        </Paper>
        </Container>
    );
}
