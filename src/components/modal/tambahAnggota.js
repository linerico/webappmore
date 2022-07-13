import Modal from 'react-bootstrap/Modal';
import React from 'react'
import Person from '../Person';
import TambahMemberModal from './tambahMember';

function
    TambahAnggota(props) {

    const { show, handleClose, setAddMember, setUbahMember, setHapusMember } = props

    function addModalMember() {
        setAddMember(true)
        handleClose()
    }

    function ubah_member (){
        setUbahMember(true)
        handleClose()
    }

    function hapus_member(){
        setHapusMember(true)
        handleClose()
    }

    return (
        <>
            <Modal show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title className='text-center w-100 fw-bold'>Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center fw-bold'>
                    <Person
                        setUbahMember={ubah_member}
                        setHapusMember={hapus_member}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className='btn btn-primary mt-3'
                        onClick={() => addModalMember()}
                    >Tambah Anggota</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TambahAnggota