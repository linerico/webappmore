import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

function TambahMemberModal(props) {

    const { show, handleClose } = props
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")

    const addMember = async() => {
        const raw = {
            id_pabrik: idPabrik,
            email: email,
            status: status
        }
        console.log(raw)
        try{
            await axios.post(`${baseUrl}/akses`, raw, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            handleClose()
        } catch (err) {
            console.log(err.response.data.message)
            setIsError(true)
            setError(err.response.data.message)
            setTimeout(() => {
                setIsError(false)
                setError("")
            }, 2000)
        }
    }
    useEffect(()=>{
        setEmail("")
        setStatus("")
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className='text-center w-100 fw-bold'>Tambah Anggota</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center fw-bold'>
                <p>Masukkan alamat email anggota baru</p>
                <input value={email} name='email' type='email' className='form-control rounded-pill' placeholder='Alamat Email' onChange={(e)=> setEmail(e.target.value)}/>
                <select value={status} className='form-control rounded-pill mt-3' onChange={(e)=> setStatus(e.target.value)}>
                    <option disabled>Status</option>
                    <option>PEMILIK</option>
                    <option>ADMIN</option>
                    <option>ANGGOTA</option>
                </select>
                {isError && (
                <div>
                    {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                    <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
                </div>
                )}
            </Modal.Body>
            <Modal.Footer className='w-100 d-flex justify-content-center'>
                <button className='btn btn-outline-danger w-25 rounded-pill' onClick={addMember}>
                    Tambah
                </button>
                <button className='btn btn-outline-primary w-25 rounded-pill' onClick={handleClose}>
                    Batal
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default TambahMemberModal