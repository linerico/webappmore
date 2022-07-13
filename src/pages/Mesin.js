import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.js';
import ItemMesin from '../components/ItemMesin';
import { MesinList } from '../helpers/MesinList';
import { Link, Router, useHistory, useParams } from 'react-router-dom';
import NavbarHeader from '../components/navbarHeader.js';
import axios from 'axios'

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'


export default function Mesin() {
  const [mesin, setMesin] = useState([])
  const [filter, setFiler] = useState([])

  const token = localStorage.getItem("accessToken")
  const router = useHistory()
  const { homeId } = useParams()
  localStorage.setItem("activePabrik", homeId)  
  localStorage.removeItem("activeMesin")
  console.log(homeId)

  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false)
  }

  const getMesin = async() => {
    const res = await axios.get(`${baseUrl}/pabrik/${homeId}/mesin`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setMesin(res.data.data.mesin)
    console.log(res)
  }
  const filterMesin = async() => {
    const res = await axios.get(`${baseUrl}/pabrik/${homeId}/mesin/${filter}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setMesin(res.data.data.mesin)
    console.log(res)
  }

  useEffect(() => {
      getMesin()
      localStorage.removeItem("delEmail")
  }, [])

  return (
    <div className='mesin'>
      <NavBar />
      <NavbarHeader
        step1={1}
        homeId={homeId}
      />

      
      <div className='d-flex container'>
        <div className='mt-0 w-100 d-flex justify-content-between py-2'>
          <h1 className='me-2 fs-3 fw-bold text-nowrap'>Daftar Mesin</h1>
          <button className='me-5 px-5 btn-sm btn text-nowrap btn-primary rounded-pill' onClick={() => router.push('/tambah-mesin')} >+ Tambah</button>
          <input name='search' className='form-control rounded-pill w-25' type='search' placeholder='Cari' 
            onKeyPress={(e) => {
              if (e.key === 'Enter'){
                console.log("enter")
                filterMesin()
              }
            }}
            onChange={(e) => {
              if(e.target.value == ""){
                getMesin()
              } else{
                setFiler(e.target.value)
              }
            }}
          />
        </div>
      </div>
      <div className='container mt-4'>
        <div className='row mx-0'>
          {mesin.map((row, i) => (
            <ItemMesin
              key={i}
              id = {row.id_mesin}
              type={row.tipe_mesin}
              brand={row.merek_mesin}
              image={row.gambar_mesin}
              name={row.nama_mesin}
            />
          ))}
        </div>
      </div>
    </div>

  )
}