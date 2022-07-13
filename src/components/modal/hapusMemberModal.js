import Modal from 'react-bootstrap/Modal';
import React, {useState} from 'react'
import axios from 'axios'

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
// const baseUrl = 'http://localhost:5000'

function HapusMemberModal(props) {

    const { show, handleClose } = props
    const delEmail = localStorage.getItem("delEmail")
    const idPabrik = localStorage.getItem("activePabrik")
    const token = localStorage.getItem("accessToken")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const delMember = async() => {
        const data = {
            id_pabrik: idPabrik,
            email: delEmail
        }
        console.log(data)
        try{
            await axios.delete(`${baseUrl}/akses`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data
            })
            handleClose()
        } catch (err) {
            console.log("Error post to More: ", err.response)
            setIsError(true)
            setError(err.response.data.message)
            setTimeout(() => {
                setIsError(false)
                setError("")
            }, 2000)
        }
        
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className='text-center w-100 fw-bold'>Hapus Anggota</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center fw-bold'>
                Apakah anda yakin ingin menghapus anggota ini?
                {isError && (
                <div>
                    {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                    <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
                </div>
                )}
            </Modal.Body>
            <Modal.Footer className='w-100 d-flex justify-content-center'>
                <button className='btn btn-outline-danger w-25 rounded-pill' onClick={delMember}>
                    Hapus
                </button>
                <button className='btn btn-outline-primary w-25 rounded-pill' onClick={handleClose}>
                    Batal
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default HapusMemberModal