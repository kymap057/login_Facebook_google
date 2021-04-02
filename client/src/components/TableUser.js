import React,{useState,useEffect} from 'react';
import axios from 'axios'
const TableUser =()=>{
    const [users,setUsers]= useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8001/api/user/')
            .then(res=>{
                localStorage.setItem('users',JSON.stringify(res.data.data));
                setUsers(res.data.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    },[])
    return(
        <div className="table-user">
            <h2>Danh sách user</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                {
                    users.length>0 &&
                    users.map(x=>{
                        return(
                            <tr>
                                <td>{x.name}</td>
                                <td>{x.phone}</td>
                                <td>{x.email}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}
export default TableUser;