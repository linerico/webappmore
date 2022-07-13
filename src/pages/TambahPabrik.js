import React from 'react'
import FormPabrik from '../components/FormPabrik'
import NavBar from '../components/NavBar'

function TambahPabrik() {
  return (
    <div className='tambahPabrik'>
      <NavBar />
      <div className='container'>
        <h1 className='text-center fw-bold mt-3 mb-5'>Tambah Pabrik</h1>
        <FormPabrik 
          create={true}
          nama=""
          alamat=""
          kabKota=""
          provinsi=""
          peta=""
          foto=""
        />

      </div>
    </div>
  )
}

export default TambahPabrik