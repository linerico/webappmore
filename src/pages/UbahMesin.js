import React from 'react'
import { useLocation } from 'react-router-dom'
import FormMesin from '../components/FormMesin'
import NavBar from '../components/NavBar'

function UbahMesin() {
  const location = useLocation()
  const idPabrik = localStorage.getItem("activePabrik")
  const exMesin = {
    nama: location.state.nama,
    tipe: location.state.tipe,
    merek: location.state.merek,
    foto: location.state.foto
  }
  return (
    <div className='ubahMesin'>
        <NavBar/>
        <div className='container'>
            <h1 className='text-center fw-bold mt-3 mb-5'>Ubah Mesin</h1>
            <FormMesin
              idPabrik={idPabrik}
              create={false}
              nama={exMesin.nama}
              tipe={exMesin.tipe}
              merek={exMesin.merek}
              foto={exMesin.foto}
            />
        </div>
    </div>
  )
}

export default UbahMesin