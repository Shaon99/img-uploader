import React, { useEffect, useState } from 'react'
import Nav from "../components/Nav"
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

export default function Dashboard() {
    const [data, setDataImage] = useState([]);
    const getData = async () => {
        const res = await fetch('/api/images', {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await res.json();
        setDataImage(data.images);
    }

    useEffect(() => {
        getData();
    }, []);


    const downloadImage = async (id) => {
        await axios.get("/api/images/download/" + id, {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            alert(result.data);

            Echo.private('App.Models.User.')
                .notification((notification) => {
                    console.log('download notification success');
                });

        }).catch((err) => {
        });
    };


    return (
        <>
            <Nav />
            <div className='px-4'>
                <div className='card shadow p-3'>
                    <div className='d-flex justify-content-between'>
                        <h2>Dashboard</h2>
                    </div>
                </div>

                <div className='py-4'>
                    <Link className="btn btn-success  btn-lg" to="/addimage">ADD-IMAGE</Link>
                </div>

                <div >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((img, i) => {
                                return (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>
                                            <img className="rounded img-fluid" src={img.image} width="200px" alt="img" />
                                        </td>
                                        <td>
                                            <button onClick={() => downloadImage(img.id)} className='btn btn-success '>Download</button>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}
