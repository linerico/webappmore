/* eslint-disable jsx-a11y/alt-text */
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Person.css';
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

function Person(props) {

    const { setUbahMember } = props
    const { setHapusMember } = props

    const dataAnggota = [
        {
            image: '/assets/person.png',
            name: "Admin A",
            email: "adminA@gmail.com",
            position: "Member"
        },
        {
            image: '/assets/person.png',
            name: "Admin B",
            email: "adminB@gmail.com",
            position: "Member"
        },
        {
            image: '/assets/person.png',
            name: "Admin C",
            email: "adminC@gmail.com",
            position: "Member"
        }
    ]

    const [owner, setOwner] = useState([])
    const [admin, setAdmin] = useState([])
    const [anggota, setAnggota] = useState([])
    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")

    const [show, setShow] = useState(false);

    const getMember = async() => {
        const res = await axios.get(`${baseUrl}/akses/${idPabrik}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const member = res.data.data.anggota
        let myOwner = []
        let myAdmin = []
        let myAnggota = []
        for (let i = 0; i<member.length; i++){
            if(member[i].status == 'PEMILIK'){
                myOwner.push(member[i])
            } else if (member[i].status == 'ADMIN') {
                myAdmin.push(member[i])
            } else if (member[i].status == 'ANGGOTA') {
                myAnggota.push(member[i])
            }
        }
        setOwner(myOwner)
        setAdmin(myAdmin)
        setAnggota(myAnggota)

    } 

    const delOwner = (i) => {
        console.log(owner[i])
    }
    const delAdmin = (i) => {
        console.log(admin[i])
    }
    const delAnggota = (i) => {
        console.log(anggota[i])
    }

    function handleClose() {
        setShow(false)
    }

    function editMember() {
        setUbahMember(true)
    }

    function deleteMember() {
        setHapusMember(true)
    }

    useEffect(() => {
        getMember()
        localStorage.removeItem("delEmail")
    }, [])
    return (
        <>
            <div>
                <h4>Pemilik</h4>
                <div>
                    {owner.map((row, i) => (
                        <div key={i} className='person d-flex w-100 justify-content-between'>
                            <div className='leftSide ms-5'>
                                <img src={row.foto_profil} style={{
                                    width: "50px",
                                    height: "50px",
                                    border: "1px solid gray",
                                    borderRadius: "30px"
                                }}/>
                            </div>
                            <div className='center me-5'>
                                <h3 className='mb-0'>{row.nama_pengguna}</h3>
                                <p className='mb-0'>{row.email}</p>
                            </div>
                            <div className='rightSide'>
                                <div>
                                    {/* <button
                                        onClick={() => editMember()}
                                        className='btn'>
                                        <img src={'/assets/Edit.png'} />
                                    </button> */}
                                    <button
                                        
                                        // onClick={() => deleteMember()}
                                        onClick={() => {
                                            localStorage.setItem("delEmail", owner[i].email)
                                            deleteMember()
                                        }}
                                        className='btn'>
                                        <img src={'/assets/Trash.png'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4>Admin</h4>
                <div>
                    {admin.map((row, i) => (
                        <div key={i} className='person d-flex w-100 justify-content-between'>
                            <div className='leftSide ms-5'>
                                <img src={row.foto_profil} style={{
                                    width: "50px",
                                    height: "50px",
                                    border: "1px solid gray",
                                    borderRadius: "30px"
                                }}/>
                            </div>
                            <div className='center me-5'>
                                <h3 className='mb-0'>{row.nama_pengguna}</h3>
                                <p className='mb-0'>{row.email}</p>
                            </div>
                            <div className='rightSide'>
                                <div>
                                    {/* <button
                                        onClick={() => editMember()}
                                        className='btn'>
                                        <img src={'/assets/Edit.png'} />
                                    </button> */}
                                    <button
                                        onClick={() => {
                                            localStorage.setItem("delEmail", admin[i].email)
                                            deleteMember()
                                        }}
                                        className='btn'>
                                        <img src={'/assets/Trash.png'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4>Anggota</h4>
                <div>
                    {anggota.map((row, i) => (
                        <div key={i} className='person d-flex w-100 justify-content-between'>
                            <div className='leftSide ms-5'>
                                <img src={row.foto_profil} style={{
                                    width: "50px",
                                    height: "50px",
                                    border: "1px solid gray",
                                    borderRadius: "30px"
                                }}/>
                            </div>
                            <div className='center me-5'>
                                <h3 className='mb-0'>{row.nama_pengguna}</h3>
                                <p className='mb-0'>{row.email}</p>
                            </div>
                            <div className='rightSide'>
                                <div>
                                    {/* <button
                                        onClick={() => editMember()}
                                        className='btn'>
                                        <img src={'/assets/Edit.png'} />
                                    </button> */}
                                    <button
                                        onClick={() => {
                                            localStorage.setItem("delEmail", anggota[i].email)
                                            deleteMember()
                                        }}
                                        className='btn'>
                                        <img src={'/assets/Trash.png'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </>
    )

}

export default Person