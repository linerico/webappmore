/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import HapusDokumenModal from './HapusDokumenModal';

function DocumentItems({ name, docLink, idDoc }) {

    const [show, setShow] = useState(false);

    function handleClose() {
        setShow(false)
    }

    return (
        <div className='col-3 mt-2 mx-2 '>
            <div className='shadow my-border-radius d-flex align-items-center'>
                <img
                    className='mx-1'
                    src='/assets/document.png'
                    width={35}
                    height={35}
                />
                <a className='d-flex my-3 mx-2 w-100 text-decoration-none' style={{
                    flexDirection: 'row',
                    color:"black"
                }} href={docLink} target={"_blank"}>
                    <h3 className='text-nowrap mb-0 fw-bold fs-6' style={{
                        width:"290px",
                        overflow: "hidden",
                        textOverflow:"ellipsis",
                    }}>{name}</h3>
                </a>
                <img
                    className='justify-content-end me-3'
                    src='/assets/Trash.png'
                    width={35}
                    height={35}
                    onClick={() => setShow(true)}
                />
                <HapusDokumenModal
                    show={show}
                    idDoc = {idDoc}
                    handleClose={handleClose}
                />
            </div>

        </div>
    )
}

export default DocumentItems