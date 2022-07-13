/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth"
import UbahNamaProfilModal from './UbahNamaProfilModal';
import axios from 'axios'
const FormData = require('form-data');

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

function FormUser() {
  const { logout } = useContext(AuthContext)
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [noTlpn, setNoTlpn] = useState("")
  const [img, setImg] = useState("")
  const inputReff = useRef(null)

  const token = localStorage.getItem("accessToken")

  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false)
  }

  // const handleChange = (target) => {
  //   let input = target.target.files[0];
  //   console.log(input)
  // }

  const getUser = async() => {
    const res = await axios.get(`${baseUrl}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setNama(res.data.data.user.nama_pengguna)
    setEmail(res.data.data.user.email)
    setNoTlpn(res.data.data.user.no_telepon)
    setImg(res.data.data.user.foto_profil)
  }

  const changeImg = async(e) => {
    const newImg = e.target.files[0];
    const formData = new FormData()
    formData.append("img", newImg, newImg.name)
    try{
      const res = await axios.put(`${baseUrl}/users/uploadprofilimage`, formData, {
        headers: {
          'Accept': `*/*`,
          'Authorization': `Bearer ${token}`,
          'Content-Type': `multipart/form-data`
        }
      })
      console.log(res.data)
      window.location.reload()
    }catch (err){
      console.log('gagal')
      console.log(err.message)
    }
  }

  const btnLogout = () => {
    logout()

  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='formUser container w-50'>
      <div className='align-items-center mt-3'>
        <Link to='/pabrik' className='text-decoration-none fw-bold'>Kembali</Link>
        <form className='mx-auto'>
        <img src={img!= null? img : '/assets/person.png'} className='mx-auto d-flex mt-3' style={{
                    width:"60px",
                    height:"60px",
                    border: "1px solid gray",
                    borderRadius: "30px"
                    
                }}></img>
        <input className='d-flex rounded-pill mx-auto align-items-center btn'
          type="file"
          ref={inputReff}
          style={{
            color:'transparent',
            width: "120px"
          }}
          // hidden
          onChange={changeImg}
          
        />

          {/* <button className='d-flex rounded-pill mx-auto align-items-center btn'
              // onClick={handleClick}
          >
            </button> */}

          <div className='form-control d-flex rounded-pill mt-3'>
            <input className='my-custom-form w-100' name='namaPengguna' type='text' value={nama}/>
            <div style={{ width: "16px" }} onClick={() => setShow(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>

          </div>
          <input className='form-control rounded-pill mt-3' name='emailPengguna' type='email' value={email}/>

          <div className='form-control d-flex rounded-pill mt-3 mb-5'>
            <input className='my-custom-form w-100' name='phonePengguna' type='tel' pattern='[0-9]{12}' value={noTlpn}/>
            <div style={{ width: "16px" }} onClick={() => setShow(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>

          <UbahNamaProfilModal
            show={show}
            handleClose={handleClose}
            nama={nama}
            noTlpn={noTlpn}
          />

          <button className='form-control rounded-pill mt-5 btn btn-danger fw-bold' onClick={logout}>KELUAR</button>

          {/* <Link to='/'>
            <button className='form-control rounded-pill mt-5 btn btn-danger fw-bold'>KELUAR</button>
          </Link> */}
        </form>
      </div>
    </div>
  )
}

export default FormUser