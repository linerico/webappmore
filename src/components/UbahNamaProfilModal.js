import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

import axios from 'axios';
const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'


export default function UbahNamaProfilModal(props) {

    const { show, handleClose, nama, noTlpn } = props
    const [fnama, setNama] = useState("")
    const [fnoTlpn, setNoTelpn] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const token = localStorage.getItem("accessToken")

    const clear = () => {
        // setNama("")
        // setNoTelpn("")
        setPassword("")
        setRePassword("")
        setEdit()
        handleClose()
    }
    const setEdit = () => {
        setNama(nama)
        setNoTelpn(noTlpn)
    }
    const editProfil = async() => {
        const user = {
            nama_pengguna: fnama,
            password: password,
            no_telepon: fnoTlpn,
        }
        if(password != rePassword){
            setIsError(true)
            setError("password yang anda masukan tidak sama")
            setTimeout(()=>{
                setIsError(false)
                setError("")
                setPassword("")
                setRePassword("")
            })
        } else {
            try {
                const res = await axios.put(`${baseUrl}/users`, user, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            } catch(err) {
                console.log(err.response)
                setIsError(true)
                setError(err.response.data.message)
                setTimeout(() => {
                    setIsError(false)
                    setError("")
                }, 2000)
            }
        }
        clear();
    }
    useEffect(()=>{
        setEdit()
    }, [])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className='text-center w-100 fw-bold'>Ubah Nama</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-start fw-bold'>
                    <form className='flex-column'>
                        <label >Nama</label>
                        <input value={fnama} className='mt-2 rounded-pill form-control' name='namaProfil' type='text' placeholder='Nama' onChange={(e) => setNama(e.target.value)}/>
                        <label >Nomor Telepon</label>
                        <input value={fnoTlpn} className='mt-2 rounded-pill form-control' name='telpProfil' type='tel' placeholder='Nomor Telepon' onChange={(e) => setNoTelpn(e.target.value)}/>
                        <label >Password Baru</label>
                        <input value={password} className='mt-2 rounded-pill form-control' name='telpProfil' type='password' placeholder='Nomor Telepon' onChange={(e) => setPassword(e.target.value)}/>
                        <label >Konfirmasi Password Baru</label>
                        <input value={rePassword} className='mt-2 rounded-pill form-control' name='telpProfil' type='password' placeholder='Nomor Telepon' onChange={(e) => setRePassword(e.target.value)}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-outline-primary' onClick={editProfil}>
                        Ubah
                    </button>
                    <button className='btn btn-outline-danger' onClick={clear}>
                        Batal
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}