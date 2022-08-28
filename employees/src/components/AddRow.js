import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const AddRow = (props) => {
    const history = useHistory();
    const [state, setState] = useState({ id: "", employee_name: "" ,employee_salaryinMonth:""})
    const onChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };
    const submit = (e) => {
        e.preventDefault();
        console.log('form submitted ✅');
        if (state.id===""||state.employee_name === "" || state.employee_salaryinMonth === "") {
            alert("id ,name and salary cannot be empty");
            history.push('/AddRow')
        } else {
            props.contactHandler(state)
            setState({id:"", employee_name: "", employee_salaryinMonth: "" })
            history.push('/')
        }
    };

    return (
        <div className='ui main' >
            <h2>Add Employee</h2>
            <form className='ui form' onSubmit={submit}>
                <div className='field' >
                    <Link to='/'><button className='ui button blue right' style={{ float: "right" }}>Employee List</button></Link>
                </div>
                <div className='field'>
                <label>Id</label>
                    <input type="text" name='id' value={state.employee_name} onChange={onChange} placeholder="Name" />
                    <label>Employee Name</label>
                    <input type="text" name='name' value={state.employee_name} onChange={onChange} placeholder="Name" />
                    <label>Employee Salary</label>
                    <input type="" name='email' value={state.employee_salaryinMonth} onChange={onChange} placeholder="Employee Salary" />
                </div>
                <div>
                    <button disabled={state.name.length < 2 || state.email.length < 5} type="submit" className="ui button black right" >Add Contact</button>
                </div>
            </form>
        </div>
    )
}

export default AddRow