import Modal from 'react-bootstrap/Modal';
import { Link, Router, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

export default function HapusPabrikModal(props) {
    const router = useHistory()
    const { show,handleClose } = props
    const token = localStorage.getItem("accessToken")
    
    const delPabrik = async() => {
        await axios.delete(`${baseUrl}/pabrik/${localStorage.getItem("activePabrik")}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        handleClose()
        router.push("/pabrik")
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className='text-center w-100 fw-bold'>Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center fw-bold'>
                    Apakah anda yakin ingin menghapus pabrik ini?
                </Modal.Body>
                <Modal.Footer className='w-100 d-flex justify-content-center'>
                    <button className='btn btn-outline-danger w-25 rounded-pill' onClick={delPabrik}>
                        Hapus
                    </button>
                    <button className='btn btn-outline-primary w-25 rounded-pill' onClick={handleClose}>
                        Batal
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}