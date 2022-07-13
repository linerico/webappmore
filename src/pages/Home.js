import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ItemPabrik from '../components/ItemPabrik.js';
import NavBar from '../components/NavBar.js';
import NavbarHeader from '../components/navbarHeader.js';
import { PabrikList } from '../helpers/PabrikList.js';
import axios from 'axios'

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
const noImg = 'https://more-app-bucket.s3.ap-southeast-1.amazonaws.com/noimg.jpg'

const Home = () => {
  const [listPabrik, setListPabrik] = useState([])
  const [filter, setFilter] = useState("")
  const token = localStorage.getItem("accessToken")
  
  localStorage.removeItem("activePabrik")
  localStorage.removeItem("activeMesin")
  
  const getPabrik = async() => {
    const res = await axios.get(`${baseUrl}/pabrik`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setListPabrik(res.data.data.pabrik)
  }

  const filterPabrik = async() => {
    const res = await axios.get(`${baseUrl}/pabrik/${filter}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    setListPabrik(res.data.data.pabrik)
  }

  useEffect(() => {
    getPabrik()
  }, [])

  const router = useHistory();

  return (
    <div className='home'>
      <NavBar />
      <NavbarHeader/>

      <div className='d-flex container'>
        <div className='mt-0 w-100 d-flex justify-content-between py-2'>
          <h1 className='me-2 fs-3 fw-bold text-nowrap'>Daftar Pabrik</h1>
          <button onClick={() => router.push('/tambah-pabrik')} className='me-5 px-5 btn-sm btn text-nowrap btn-primary rounded-pill'>+ Tambah</button>
          <input name='search' className='form-control rounded-pill w-25' type='search' placeholder='Cari' 
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                filterPabrik()
              }
            }} 
            onChange={(e)=>{
              if(e.target.value == ""){
                getPabrik()
              }else{
                setFilter(e.target.value)
              }
            }}
          />
        </div>
      </div>
      <div className='pabrik container px-0'>
        <div className='row mx-0'>
          {listPabrik.map((item,key) => {
            return (
              <ItemPabrik
                key={key}
                image={item.gambar_pabrik != null ? (item.gambar_pabrik) : (noImg) }
                id={item.id_pabrik}
                name={item.nama_pabrik}
                caption={item.alamat_pabrik}
              />
            )
          })}
          {/* {PabrikList.map((menuItem, key) => {
            console.log(key)
            return (
              <ItemPabrik
                key={key}
                image={menuItem.image}
                name={menuItem.name}
                caption={menuItem.caption} />
            );
          })} */}
        </div>
      </div>
    </div>
  )
}

export default Home