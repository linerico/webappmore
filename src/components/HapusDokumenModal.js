import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

export default function HapusDokumenModal(props) {

    const { show, idDoc, handleClose } = props
    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")

    const delDoc = async() => {
        try {
            await axios.delete(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/dokumen/${idDoc}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            handleClose()
            window.location.reload()
        }catch(err) {
            console.log(err.response)
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className='text-center w-100 fw-bold'>Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center fw-bold'>
                    Apakah anda yakin ingin menghapus dokumen ini?
                </Modal.Body>
                <Modal.Footer className='w-100 d-flex justify-content-center'>
                    <button className='btn btn-outline-danger w-25 rounded-pill' onClick={() => delDoc()}>
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