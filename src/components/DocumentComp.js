import React, { useEffect, useState } from 'react'
import { DocumentList } from '../helpers/DocumentList';
import DocumentItems from './documentItems';
import TambahDokumenModal from './TambahDokumenModal';
import axios from 'axios'

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

function DocumentComp() {

    const [show, setShow] = useState(false);
    const [doc, setdoc] = useState([])
    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")
    
    const getDoc = async() =>{
        const res = await axios.get(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/dokumen`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setdoc(res.data.data.dokumen)
        console.log(res.data.data.dokumen)
    }

    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        getDoc()
    }, [])

    return (
        <div>
            <div className='container d-flex mt-0 w-100 justify-content-end py-2'>
                <button className='mx-3 px-5 btn text-nowrap btn-primary rounded-pill' onClick={() => setShow(true)}>+ Tambah</button>
                {/* <input name='search' type='search' className='form-control rounded-pill w-25' placeholder='Telusuri' /> */}
                <TambahDokumenModal
                    show={show}
                    handleClose={handleClose}
                />
            </div>
            <div className='row mx-0' style={{
                width:"1700px"
            }}>
                {
                    doc.map((row, key) => (
                        <DocumentItems
                            key={key}
                            name={row.nama}
                            docLink={row.dokumen}
                            idDoc={row.id_dokumen}
                        />
                    ))

                }
            </div>
        </div>
    )
}

export default DocumentComp