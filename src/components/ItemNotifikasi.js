import React from 'react';
import '../styles/ItemNotif.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'


function ItemNotifikasi({ name, location, myNotif }) {
  const token = localStorage.getItem("accessToken")
  const router = useHistory()

  const klikNotifHandler = async() => {
    const res = await axios.put(`${baseUrl}/notifikasi/${myNotif.id_notifikasi}`,{} ,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    console.log(res.data)
    router.push(`/pabrik/${myNotif.id_pabrik}/mesin/${myNotif.id_mesin}`)

  }

  return (
    <div className={myNotif.baca?'itemNotifikasi container w-100 d-flex border my-border-radius shadow my-3':'itemNotifikasi container w-100 d-flex border border-danger my-border-radius shadow my-3'} onClick={() => klikNotifHandler()}>
      <div className='leftSide my-auto mx-2'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <div className='rightSide my-auto flex-column p-2 ms-3'>
        <p className='text-start fw-bold mb-0 text-start'>{name}</p>
        <p className='text-start fw-bold mb-0'>{location}</p>
        <p className='text-start mb-0'>Peringatan terjadi alarm</p>
      </div>
    </div>
  )
}

export default ItemNotifikasi