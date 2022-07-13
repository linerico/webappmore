import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios'

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

export default function TambahDokumenModal(props) {

    const { show, handleClose } = props
    const [check, setCheck] = useState(false)
    const [name, setName] = useState("")
    const [doc, setDoc] = useState()

    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")
    
    const addDoc = async() => {
        const formData = new FormData()
        if(doc != undefined){
            formData.append("dokumen", doc, doc.name)
        }
        if(check){formData.append("gantiNama", '1')}else{formData.append("gantiNama", '0')}
        if(name!=""){formData.append("nama", name)}
        try{
            const res = await axios.post(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/dokumen`, formData, {
                headers: {
                    'Accept': `*/*`,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': `multipart/form-data`
                }
            })
            console.log(res.data)
            setCheck(false)
            setName("")
            setDoc()
            handleClose()
        } catch(err){
            console.log(err.response)
        }
        
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title className='text-center w-100 fw-bold'>Tambah Dokumen</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-start fw-bold'>
                    <form className='flex-column'>
                        <label >Pilih Dokumen</label>
                        <input name='tambahDoc' type='file' className='mt-2 mb-3 rounded-pill form-control' onChange={(e)=>{setDoc(e.target.files[0])}}/>
                        <input checked={check} name='gantiNama' type='checkbox' onChange={(e)=> {setCheck(e.target.checked)}}/> <label>Ganti nama dokumen?</label>
                        <br/>
                        <input value={name} className='mt-2 rounded-pill form-control' name='namaDoc' type='text' placeholder='Nama Dokumen' disabled={!check? true: false} onChange={(e)=> {setName(e.target.value)}}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-outline-primary' onClick={()=> addDoc()}>
                        Tambah
                    </button>
                    <button className='btn btn-outline-danger' onClick={handleClose}>
                        Batal
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}