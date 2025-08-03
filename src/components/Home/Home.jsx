
import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Home() {

    const navigate = useNavigate();

    const name = localStorage.getItem('currentUser');

    const [animation, setAnimtaion] = useState('slide-in');

    const [step, setStep] = useState('hello');

    const [people, setPeople] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        status: '',
        job: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        age: '',
        status: '',
        job: '',
    });

    const englishLettersRegex = /^[A-Za-z\s]+$/;    
    const numbersOnlyRegex = /^\d+$/;               
    const validStatuses = ['single', 'married', 'divorced'];  



    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {

        const saved = localStorage.getItem('people');
        if (saved) {
            setPeople(JSON.parse(saved));
        }


        const timer1 = setTimeout(() => {

            setAnimtaion('slide-out');

        }, 2000);


        // const timer2 = setTimeout(() => {

        //     setStep('loading');

        // }, 3000 + 400);


        const timer3 = setTimeout(() => {

            setStep('table');

        }, 2000 + 2000);

        return () => {

            clearTimeout(timer1);

            //clearTimeout(timer2);

            clearTimeout(timer3);

        };

    }, []);

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };

    // const handleSubmit = (e) => {

    //     e.preventDefault();

    //     let updatedPeople = [...people];

    //     if (editIndex !== null) {

    //         updatedPeople[editIndex] = formData;

    //         setEditIndex(null);

    //         Swal.fire({

    //             icon: "success",

    //             title: "has been updated successfully",

    //             showConfirmButton: false,

    //             timer: 1500,

    //             position: "top-end"

    //         });

    //     } else {

    //         updatedPeople.push(formData);

    //         Swal.fire({

    //             icon: "success",

    //             title: "has been added successfully",

    //             showConfirmButton: false,

    //             timer: 1500,

    //             position: "top-end"

    //         });

    //     }

    //     setPeople(updatedPeople);

    //     localStorage.setItem('people', JSON.stringify(updatedPeople));

    //     setFormData({ name: '', age: '', status: '', job: '' });

    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {
            name: '',
            age: '',
            status: '',
            job: '',
        };

        let isValid = true;

        const englishLettersRegex = /^[A-Za-z\s]+$/;
        const numbersOnlyRegex = /^\d+$/;
        const validStatuses = ['single', 'married', 'divorced'];
    
        // Name
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (!englishLettersRegex.test(formData.name)) {
            errors.name = 'Name must contain letters only';
            isValid = false;
        }
    
        // Age
        if (!formData.age.trim()) {
            errors.age = 'Age is required';
            isValid = false;
        } else if (!numbersOnlyRegex.test(formData.age)) {
            errors.age = 'Age must be numbers only';
            isValid = false;
        }
    
        // Status
        if (!formData.status.trim()) {
            errors.status = 'Status is required';
            isValid = false;
        } else if (!validStatuses.includes(formData.status.toLowerCase())) {
            errors.status = 'Status must be: single, married, or divorced';
            isValid = false;
        }
    
        // Job
        if (!formData.job.trim()) {
            errors.job = 'Job is required';
            isValid = false;
        } else if (!englishLettersRegex.test(formData.job)) {
            errors.job = 'Job must contain letters only';
            isValid = false;
        }
    
        setFormErrors(errors);
    
        if (!isValid) return;
        
    
        let updatedPeople = [...people];

        if (editIndex !== null) {
            updatedPeople[editIndex] = formData;
            setEditIndex(null);
            Swal.fire({
                icon: "success",
                title: "This user has been updated successfully",
                showConfirmButton: false,
                timer: 1500,
                position: "top-end"
            });
        } else {
            updatedPeople.push(formData);
            Swal.fire({
                icon: "success",
                title: "A new user has been added successfully",
                showConfirmButton: false,
                timer: 1500,
                position: "top-end"
            });
        }

        setPeople(updatedPeople);
        localStorage.setItem('people', JSON.stringify(updatedPeople));
        setFormData({ name: '', age: '', status: '', job: '' });
        setFormErrors({ name: '', age: '', status: '', job: '' });
    };



    const handleEdit = (index) => {

        const person = people[index];

        setFormData({

            name: person.name,

            age: person.age,

            status: person.status,

            job: person.job

        });

        setEditIndex(index);

        Swal.fire({

            position: "top-end",

            icon: "info",

            title: `Now, you can update the user data from the form`,

            showConfirmButton: false,

            timer: 1500

        });
    };



    const handleDelete = (index) => {

        Swal.fire({

            title: "Are you sure?",

            text: "you won't be able to revert this!",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#3085d6",

            cancelButtonColor: "#d33",

            confirmButtonText: " Yes, delete this",

            cancelButtonText: "No,cancel",

        }).then((result) => {

            if (result.isConfirmed) {

                const updated = [...people];

                updated.splice(index, 1);

                setPeople(updated);

                localStorage.setItem('people', JSON.stringify(updated));

                Swal.fire({

                    title: "Deleted!",

                    text: "This item has been deleted successfully.",

                    icon: "success"

                });

            }

        });
    };











    return <>


        {step === 'hello' && (

            <div className="Welcome">


                <div class={`rounded-border-gradient ${animation}`}>

                    <h1>Welcome my friend</h1>


                </div>
            </div>

        )}




        {/* {step === 'loading' && (
            <div className="loading-wrapper">
                <div className="loader"></div>
            </div>
        )} */}



        {step === 'table' && (

            <>
                <button className="logout-button" onClick={() => navigate('/')}>

                    Logout

                </button>

                <form className='data' onSubmit={handleSubmit}>
                    <input
                        type="text"

                        name="name"

                        placeholder="Name"

                        value={formData.name}
                        onChange={handleChange} />

                    {formErrors.name && <p className="error-text">{formErrors.name}</p>}

                    <input
                        type="text"

                        name="age"

                        placeholder="Age"

                        value={formData.age}
                        onChange={handleChange} />

                    {formErrors.age && <p className="error-text">{formErrors.age}</p>}

                    <input
                        type="text"

                        name="status"

                        placeholder="Marital Status"
                        value={formData.status}
                        onChange={handleChange} />

                    {formErrors.status && <p className="error-text">{formErrors.status}</p>}

                    <input
                        type="text"

                        name="job"

                        placeholder="Job"

                        value={formData.job}
                        onChange={handleChange} />

                    {formErrors.job && <p className="error-text">{formErrors.job}</p>}

                    <button className="super-button">

                        <span>Submit</span>

                        <svg fill="none" viewBox="0 0 24 24" class="arrow">

                            <path
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke-width="2"
                                stroke="currentColor"
                                d="M5 12h14M13 6l6 6-6 6"
                            ></path>

                        </svg>

                    </button>

                </form>

                <table className='people-table'>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Age</th>

                            <th>Marital Status</th>

                            <th>Job</th>

                            <th>Update</th>

                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {people.map((person, index) => (

                            <tr key={index}>

                                <td>{person.name}</td>

                                <td>{person.age}</td>

                                <td>{person.status}</td>

                                <td>{person.job}</td>

                                <td>

                                    <button className='buttonup' onClick={() => handleEdit(index)}>Update</button>

                                </td>

                                <td>

                                    <button className='buttondel' onClick={() => handleDelete(index)}>Delete</button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table></>

        )}

























    </>

}
