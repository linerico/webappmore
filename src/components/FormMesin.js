import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
const FormData = require('form-data');

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
// const baseUrl = 'http://localhost:5000'
const FormMesin = ({idPabrik, create, nama, tipe, merek, foto}) => {
    const router = useHistory()
    const [fnama, setNama] = useState("")
    const [ftipe, setTipe] = useState("")
    const [fmerek, setMerek] = useState("")
    const [ffoto, setFoto] = useState()
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)

    const token = localStorage.getItem("accessToken")
    const activePabrik = localStorage.getItem("activePabrik")

    const addMesin = async() => {
        const formData = new FormData()
        if(fnama!=""){formData.append("nama_mesin", fnama)}
        if(ftipe!=""){formData.append("tipe_mesin", ftipe)}
        if(fmerek!=""){formData.append("merek_mesin", fmerek)}
        if(ffoto != undefined){
            formData.append("gambar_mesin", ffoto, ffoto.name)
        }
        console.log(ffoto)
        try{
            const res = await axios.post(`${baseUrl}/pabrik/${activePabrik}/mesin`, formData, {
                headers: {
                    'Accept': `*/*`,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': `multipart/form-data`
                }
            })
            router.push(`/pabrik/${activePabrik}`)
        } catch(err){
            console.log(err.message)
            setIsError(true)
            setError(err.message)
            setTimeout(() => {
                setIsError(false)
                setError("")
            }, 2000)
        }
    }

    return (
        <div className='formMesin w-75 mx-auto'>
            
                <div className='row mt-3'>
                    <p className='col-4'>Nama Mesin</p>
                    <div className='col-8'>
                        <input value={fnama} className='form-control rounded-pill' name='namaMesin' type='text' onChange={(e) => setNama(e.target.value)}/>
                    </div>
                </div>

                <div className='row mt-3'>
                    <p className='col-4'>Tipe Mesin</p>
                    <div className='col-8'>
                        <input value={ftipe} className='form-control rounded-pill' name='tipeMesin' type='text' onChange={(e) => setTipe(e.target.value)}/>
                    </div>
                </div>

                <div className='row mt-3'>
                    <p className='col-4'>Merek Mesin</p>
                    <div className='col-8'>
                        <input value={fmerek} className='form-control rounded-pill' name='merekMesin' type='text' onChange={(e) => setMerek(e.target.value)}/>
                    </div>
                </div>

                <div className='row mt-3'>
                    <p className='col-4'>Foto Mesin</p>
                    <div className='col-8'>
                        <input className='form-control rounded-pill' name='fotoMesin' type='file' onChange={(e) => setFoto(e.target.files[0])}/>
                    </div>
                </div>

                {isError && (
                <div>
                    {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                    <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
                </div>
                )}

                <div className='text-center mt-5'>
                    <button className='btn btn-primary w-25 me-3' onClick={create ? addMesin: console.log("Edit")}>{create ? 'TAMBAH' : 'UBAH'}</button>
                    <button onClick={()=>router.goBack()} className='btn btn-danger w-25 ms-3'>BATAL</button>
                </div>
            

        </div>
    )
}

export default FormMesin