import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Todo() {
    const [fetchData, setFetchData] = useState([])
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Completed, setCompleted] = useState(false)
    const [Editing, setEditing] = useState(false)
    const [ActiveId, setActiveId] = useState(null)


    useEffect(() => {
        console.log("Effect is running...")
        fetchItems();
    }, [])

    function fetchItems() {
        try {
            axios.get('/api/todo-list/')
                .then(res => setFetchData(res.data))
        }
        catch (e) {
            console.log(e);
        }
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function editingItem(id, tit, desc, comp) {
        setTitle(tit);
        setDescription(desc);
        setCompleted(comp);
        setEditing(true);
        setActiveId(id);
    }

    function checkEditing() {
        if (Editing === true) {
            if (Title === "" || Description === "") {
                setEditing(false)
            }
        }
    }

    function deleteItem(id) {
        const csrftoken = getCookie('csrftoken');
        axios.delete(`/api/todo-delete/${id}/`,{
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        }).then((response) => {
            setTitle("");
            setDescription("");
            setCompleted(false);
            setActiveId(null);
            fetchItems();
        }, (error) => {
            console.log(error)
        });
    }

    function handleSubmit(e) {
        const csrftoken = getCookie('csrftoken');
        if (Editing === false) {
            axios.post('/api/todo-create/', { 'title': Title, 'description': Description, 'completed': Completed }, {
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }).then((response) => {
                setTitle("");
                setDescription("");
                setCompleted(false);
                fetchItems();
            }, (error) => {
                console.log(error);
            });
        }
        else{
            axios.post(`/api/todo-update/${ActiveId}/`, { 'id': ActiveId, 'title': Title, 'description': Description, 'completed': Completed }, {
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                }
            }).then((response) => {
                setTitle("");
                setDescription("");
                setCompleted(false);
                setActiveId(null);
                fetchItems();
            }, (error) => {
                console.log(error)
            });
        }


    }

    return (
        <div>
            <h4 style={{ textAlign: 'center', marginTop: '12px' }}>Adding Item to Todo List</h4>
            <div className="container my-2">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                    <div className='container d-flex my-2'>
                        <input value={Title} onChange={(e) => { setTitle(e.target.value); checkEditing() }} className="p-1" placeholder="title..." style={{ width: '90%' }} type="text" />
                        <span><button onClick={() => { console.log('Title is :', Title); console.log('Description is :', Description); console.log('Completed is ', Completed) }} className="btn btn-primary mx-1">Submit</button></span>
                    </div>
                    <input readOnly checked={Completed} id='completedCheckbox' onInput={() => { !Completed ? setCompleted(true) : setCompleted(false) }} type="checkbox" /><label className="my-1" htmlFor="completedCheckbox">&nbsp;Task completed.</label>
                    <div className="d-flex justify-content-center align-item-center w-100">
                        <textarea value={Description} onChange={(e) => { setDescription(e.target.value); checkEditing() }} placeholder='description...' className="w-100 p-1" style={{ height: '250px' }} row="50"></textarea>
                    </div>
                </form>
            </div>
            <hr />
            <div className="container">
                <h4 className="my-3">All List Items</h4>
                <div className="d-flex flex-wrap my-4">
                    {
                        fetchData.map((task, index) => {
                            return (
                                <div key={index} className="card border-dark mb-3 mx-1" style={{ maxWidth: '18rem' }}>
                                    <div className="card-header d-flex justify-content-between">
                                        <i onClick={() => editingItem(task.id, task.title, task.description, task.completed)} style={{ fontSize: '18px', cursor: 'pointer' }} className="fa fa-edit m-2"></i>
                                        <div className="m-1">{task.completed?<i style={{fontSize:'18px',color:'green'}} className="fa fa-check" aria-hidden="true"></i>:<i style={{fontSize:'18px',color:'red'}} className="fa fa-times" aria-hidden="true"></i>}</div>
                                        <i className="fa fa-trash-o m-2" onClick={()=>{deleteItem(task.id)}} style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}></i>
                                    </div>
                                    <div className="card-body text-dark">
                                        <h5 className="card-title">{task.title}</h5>
                                        <p className="card-text">{task.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}