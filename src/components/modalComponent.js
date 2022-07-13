import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

export default function ModalComponent(props) {

    const {index, show,handleClose, nama, fullData } = props
    // console.log('nama : ', nama)
    const [check, setCheck] = useState(false)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)

    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")
    const setsetting = () => {
        console.log(fullData[index])
        setCheck(fullData[index].enableAlarm)
        setMin(fullData[index].min)
        setMax(fullData[index].max)
        console.log('telah di setting')
    }
    const settingAlarm = async() => {
        const data = {
            nama: nama,
            enable: check,
            min,
            max
        }
        // console.log(data)
        try {
            const res = await axios.put(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/monitor`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res.data)
            handleClose()
        } catch(err){
            console.log(err.response)
        }
    }
    useEffect(() => {
        setsetting()
    }, [])

    return (
        <>
            <Modal show={show} onHide={handleClose} onShow={setsetting}>
                <Modal.Header>
                    <Modal.Title className='text-center w-100'>Pengaturan Alarm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='flex-column'>
                        <input checked={check} name='aktifAlarm' type='checkbox' onChange={(e) => {setCheck(e.target.checked)}}/> <label>Aktifkan Alarm</label>
                        <br/>
                        <label className='mt-3'>Batas Minimum</label>
                        <input value={min} className='mt-2 rounded-pill form-control' name='batasMin' type='number' disabled={!check? true: false} onChange={(e) => setMin(e.target.value)}/>
                        <label className='mt-2'>Batas Maksimum</label>
                        <input value={max} className='mt-2 rounded-pill form-control' name='batasMax' type='number' disabled={!check? true: false} onChange={(e) => setMax(e.target.value)}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-outline-primary' onClick={settingAlarm}>
                        Simpan
                    </button>
                    <button className='btn btn-outline-danger' onClick={handleClose}>
                        Batal
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}