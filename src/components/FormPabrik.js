import React, { useEffect, useState } from 'react'
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios'
const FormData = require('form-data');

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
// const baseUrl = 'http://localhost:5000'
const FormPabrik = ({create, nama, alamat, kabKota, provinsi, peta, foto}) => {
  const router = useHistory()
  const [fnama, setNama] = useState("")
  const [falamat, setAlamat] = useState("")
  const [fkabKota, setKabKota] =useState("")
  const [fprovinsi, setProvinsi] = useState("")
  const [fpeta, setPeta] = useState("")
  const [ffoto, setFoto] = useState()
  const token = localStorage.getItem("accessToken")
  const idPabrik = localStorage.getItem("activePabrik")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [exfoto, setExFoto] = useState()
  const [fileName, setFileName] = useState()
  const [newFoto, setNewFoto] = useState()
  const exPabrik={
    nama, alamat, kabKota, provinsi, peta, foto
  }
  
  const setEdit = () => {
    if(!create){
      setNama(exPabrik.nama)
      setAlamat(exPabrik.alamat)
      setKabKota(exPabrik.kabKota)
      setProvinsi(exPabrik.provinsi)
      setPeta(exPabrik.peta)
      try{
        setFileName(exPabrik.foto.split('/')[5])
      } catch{

      }
      
      setFoto(exPabrik.foto)
    }
  }
  const getimg = async(url) => {
    try{
      console.log(url)
      const res = await axios(url, {
        crossdomain: true
      })
      console.log(res.data)
    }catch(err){
      console.log(err.response)
    }
  }
  const convertURLtoFile = async(url) =>{
    const response = await fetch(url);
    const data = await response.blob();
    const filename = url.split("/").pop();
    const metadata = {
      type: `image/jpeg`
    };
    return new File([data], filename, metadata);
  }

  const addPabrik = async() => {
    const formData = new FormData()
    if(fnama!=""){formData.append("nama_pabrik", fnama)}
    if(falamat!=""){formData.append("alamat_pabrik", falamat)}
    if(fkabKota!=""){formData.append("kab_kota_pabrik", fkabKota)}
    if(fprovinsi!=""){formData.append("provinsi_pabrik", fprovinsi)}
    if(ffoto !== undefined){
      formData.append("gambar_pabrik", ffoto, ffoto.name)
      
    }
    if(fpeta!=""){formData.append("peta_pabrik", fpeta)}
    
    console.log(token)
    try{
      console.log(ffoto)
      const res = await axios.post(`${baseUrl}/pabrik`, formData, {
        headers: {
          'Accept': `*/*`,
          'Authorization': `Bearer ${token}`,
          'Content-Type': `multipart/form-data`
        }
      })
      router.push("/pabrik")
    } catch (err){
      console.log("Error post to More: ", err.response.data.message)
      setIsError(true)
      setError(err.response.data.message)
      setTimeout(() => {
        setIsError(false)
        setError("")
      }, 2000)
    }
  }
  const addNewFoto = (e) => {
    if(create){
      console.log('setFoto')
      setFoto(e.target.files[0])
      setFileName(e.target.files[0].name)
    }else{
      setNewFoto(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
    
  }
  const ubahPabrik = async() => {
    const formData = new FormData()
    if(fnama!=""){formData.append("nama_pabrik", fnama)}
    if(falamat!=""){formData.append("alamat_pabrik", falamat)}
    if(fkabKota!=""){formData.append("kab_kota_pabrik", fkabKota)}
    if(fprovinsi!=""){formData.append("provinsi_pabrik", fprovinsi)}
    if(newFoto !== undefined){
      console.log(newFoto)
      formData.append("gambar_pabrik", newFoto, newFoto.name)
    }
    if(fpeta!=""){formData.append("peta_pabrik", fpeta)}

    try{
      const res = await axios.put(`${baseUrl}/pabrik/${idPabrik}`, formData, {
        headers: {
          'Accept': `*/*`,
          'Authorization': `Bearer ${token}`,
          'Content-Type': `multipart/form-data`
        }
      })
      router.push("/pabrik")
    } catch (err){
      console.log("Error post to More: ", err.response.data.message)
      setIsError(true)
      setError(err.response.data.message)
      setTimeout(() => {
        setIsError(false)
        setError("")
      }, 2000)
    }

  }

  useEffect(()=>{
    setEdit()
  }, [])
  return (
    <div className='formPabrik w-75 mx-auto'>
      
        <div className='row mt-3'>
          <p className='col-4'>Nama Pabrik</p>
          <div className='col-8'>
            <input value={fnama} className='form-control rounded-pill' name='namaPabrik' type='text' onChange={(e) => setNama(e.target.value)}/>
          </div>
        </div>

        <div className='row mt-3'>
          <p className='col-4'>Alamat Pabrik</p>
          <div className='col-8'>
            <input value={falamat} className='form-control rounded-pill' name='alamatPabrik' type='text' onChange={(e) => setAlamat(e.target.value)}/>
          </div>
        </div>

        <div className='row mt-3'>
          <p className='col-4'>Kab / Kota Pabrik</p>
          <div className='col-8'>
            <input value={fkabKota} className='form-control rounded-pill' name='kabkotaPabrik' type='text' onChange={(e) => setKabKota(e.target.value)}/>
          </div>
        </div>

        <div className='row mt-3'>
          <p className='col-4'>Provinsi Pabrik</p>
          <div className='col-8'>
            <input value={fprovinsi} className='form-control rounded-pill' name='provinsiPabrik' type='text' onChange={(e)=> setProvinsi(e.target.value)}/>
          </div>
        </div>

        <div className='row mt-3'>
          <p className='col-4'>Tautan Peta</p>
          <div className='col-8'>
            <input value={fpeta} className='form-control rounded-pill' name='linkPabrik' type='url' onChange={(e)=>setPeta(e.target.value)}/>
          </div>
        </div>

        <div className='row mt-3'>
          <p className='col-4'>Foto Pabrik</p>
          <div className='col-8' style={{display: "inline"}}>
            <input value={fileName} className='form-control ' name='fotoPabrik' disabled type='text' style={{
              width:"82%",
              display: "inline",
              borderRadius:"50px 00px 0px 50px"
            }}/>
            <input  className='form-control' name='fotoPabrik' type='file' onChange={(e) => {
              addNewFoto(e)
              // setFileName(e.target.files.name)
            }} style={{
              width:"18%",
              display: "inline",
              borderRadius:"0px 50px 50px 0px"
            }}/>
              
          </div>
        </div>
        {isError && (
              <div>
                {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
              </div>
            )}
        <div className='text-center mt-5'>
          <button className='btn btn-primary w-25 me-3 fw-bold' onClick={create ? addPabrik : ubahPabrik}>{create ? 'TAMBAH' : 'UBAH'}</button>
          <button className='btn btn-danger w-25 ms-3 fw-bold' onClick={() => router.goBack()}>BATAL</button>
        </div>

    </div>
  )
}

export default FormPabrik