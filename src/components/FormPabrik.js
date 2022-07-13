import React, { useEffect, useState } from 'react'
import { Link, Router, useHistory } from 'react-router-dom';
import axios from 'axios'
const FormData = require('form-data');

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

const FormPabrik = ({create, nama, alamat, kabKota, provinsi, peta, foto}) => {
  const router = useHistory()
  const [fnama, setNama] = useState("")
  const [falamat, setAlamat] = useState("")
  const [fkabKota, setKabKota] =useState("")
  const [fprovinsi, setProvinsi] = useState("")
  const [fpeta, setPeta] = useState("")
  const [ffoto, setFoto] = useState()
  const token = localStorage.getItem("accessToken")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [exfoto, setExFoto] = useState()
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

  // const convertUrlToFile = async(url) => {
  //   fetch(url)
  //   .then(async response=>{
  //     const contentType = response.headers.get('content-type')
  //     const blob = await response.blob()
  //     const file = new File([blob], 'file.png', { contentType })
  //     setExFoto(file);
  //     console.log(file)
  //   })
  // }

  // convertUrlToFile(foto);

  // fetch('https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg?v=1572867553%27')
  //   .then(async response=>{
  //     const contentType = response.headers.get('content-type')
  //     const blob = await response.blob()
  //     const file = new File([blob], 'file.jpg', { contentType })
  //     setExFoto(file);
  //     console.log(file)
  //   })

  // // const [pabrik, setPabrik] = useState({
  // //   nama:"",
  // //   alamat:"",
  // //   kabKota: "",
  // //   provinsi: "",
  // //   peta: "",
  // //   foto: ""
  // // })
  // // if (!create){
  // //   setPabrik = {nama, alamat, kabKota, provinsi, peta, foto}
  // // }

  // const onFileUpdate = () => {
    
  // }

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

  const ubahPabrik = async() => {
    getimg(exPabrik.foto)
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
          <div className='col-8'>
            <input className='form-control rounded-pill' name='fotoPabrik' type='file' onChange={(e)=> {setFoto(e.target.files[0])}}/>
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