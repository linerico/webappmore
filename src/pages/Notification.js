/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ItemNotifikasi from '../components/ItemNotifikasi';
import { NotifList } from '../helpers/NotificationList';
import { Link } from 'react-router-dom';
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

const Notification = () => {
  const [notif, setNotif] = useState([])
  const [pabrik, setPabrik] = useState({})
  const [mesin, setMesin] = useState({})
  const token = localStorage.getItem("accessToken")
  const getNotif = async() => {
    try{
      const res = await axios.get(`${baseUrl}/notifikasi`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(res.data)
      setNotif(res.data.data.notifikasi)
    }catch(err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getNotif()
  }, [])
  return (
    <div className='notification'>
      <NavBar />
      <div className='content container w-50 mt-3'>
        <Link to='/pabrik' className='text-decoration-none fw-bold'>Kembali</Link>

        <h1 className='mt-4 text-center fw-bold mb-3'>Pemberitahuan</h1>

        <div className='notif'>
          {notif.map((menuItem, key) => {
            return (
              <ItemNotifikasi
                key={key}
                name={menuItem.nama_mesin}
                location={menuItem.nama_pabrik} 
                myNotif = {menuItem}/>
            );
          })}
        </div>
      </div>

    </div>
  )
}

export default Notification