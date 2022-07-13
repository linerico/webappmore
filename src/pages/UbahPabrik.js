import React from 'react'
import { useLocation } from 'react-router-dom'
import FormPabrik from '../components/FormPabrik'
import NavBar from '../components/NavBar'

function UbahPabrik() {
  const location = useLocation()
  const exPabrik = {
    nama: location.state.nama,
    alamat: location.state.alamat,
    kabKota: location.state.kabKota,
    provinsi: location.state.provinsi,
    peta: location.state.peta,
    foto: location.state.foto
  }
  console.log(exPabrik)
  return (
    <div className='ubahPabrik'>
        <NavBar/>
        <div className='container'>
            <h1 className='text-center fw-bold mt-3 mb-5'>Ubah Pabrik</h1>
            <FormPabrik 
              create={false}
              nama={exPabrik.nama}
              alamat={exPabrik.alamat}
              kabKota={exPabrik.kabKota}
              provinsi={exPabrik.provinsi}
              peta={exPabrik.peta}
              foto={exPabrik.foto}
            />
        </div>
    </div>
  )
}

export default UbahPabrik