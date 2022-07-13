import Modal from 'react-bootstrap/Modal';
import React from 'react'

function UbahMemberModal(props) {

    const { show, handleClose } = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title className='text-center w-100 fw-bold'>Ubah Anggota</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center fw-bold'>
                <p>Masukkan alamat email anggota baru</p>
                <input name='email' type='email' className='form-control rounded-pill' placeholder='Alamat Email' />
                <select className='form-control rounded-pill mt-3'>
                    <option disabled>Status</option>
                    <option>Owner</option>
                    <option>Admin</option>
                    <option>Member</option>
                </select>
            </Modal.Body>
            <Modal.Footer className='w-100 d-flex justify-content-center'>
                <button className='btn btn-outline-danger w-25 rounded-pill' onClick={handleClose}>
                    Ubah
                </button>
                <button className='btn btn-outline-primary w-25 rounded-pill' onClick={handleClose}>
                    Batal
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default UbahMemberModal