import React, {useEffect} from 'react';
import './Dashboard.scss';
import axios from "axios";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

    const [users, setUsers] = useState([]);

    const nameRef = React.createRef();
    const surnameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const _isIncorrectEmail = (mail) => {
        return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);

    }

    const getUsers = async () => {
        const response = await axios.get('/api/users');


        if (response.data.success) {
            const users = response.data.users;

            setUsers(users);
        }

    };

    const notifyAddUserSuccess = () => toast.success("User Added");
    const notifyAddUserError = () => toast.error("User Not Added");

    const addUser = async (e) => {
        e.preventDefault();

        const name = nameRef.current.value,
            surname = surnameRef.current.value,
            email = emailRef.current.value,
            password = passwordRef.current.value;

        if (name.length < 5 ||
            surname.length < 5 ||
            password.length < 5 ||
            _isIncorrectEmail(email)) {
            console.log('Incorrect data');
            return;
        }

        const data = {name, surname, email, password};

        try {
            const response = await axios.post('/api/users', data, {});

            if (response.data.success) {
                getUsers();
                notifyAddUserSuccess();
            }

        } catch (error) {
            console.log(error);
            notifyAddUserError();
        }

    };
    const removeUser = async (id) => {
        const response = await axios.post('/api/users/remove', {id});

        if (response.data.success) {
            getUsers();
        }
    }

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <div className='Dashboard-container'>
            <ToastContainer theme={"dark"} position={"bottom-right"}/>
            <h1>Welcome in mailer Dashboard</h1>
            <form>
                <input ref={nameRef} type='text' placeholder='Name'/>
                <input ref={surnameRef} type='text' placeholder='Surname'/>
                <input ref={emailRef} type='text' placeholder='Email'/>
                <input ref={passwordRef} type='text' placeholder='Password'/>
                <button onClick={addUser}>Dodaj</button>
            </form>
            <h2 className={'emailList'}>Email list</h2>

            <div className={'listEmails'}>
                <div className={'field'}>
                    <h3>Name | Surname | Email | Password</h3>
                </div>
                {users.map(user => (
                    <div key={user._id} className={'users'}>
                        <p className={'name'}>{user.name.length < 25 ? user.name : user.name.substr(0, 22) + '...'}</p>
                        <p className={'surname'}>{user.surname.length < 25 ? user.surname : user.surname.substr(0, 22) + '...'}</p>
                        <p className={'email'}>{user.email.length < 25 ? user.email : user.email.substr(0, 22) + '...'}</p>
                        <p className={'password'}>{user.password.length < 25 ? user.password : user.password.substr(0, 22) + '...'}</p>
                        <button onClick={() => {
                            removeUser(user._id)
                        }
                        }>Remove User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Dashboard;