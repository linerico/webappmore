import React from 'react'
import FormMesin from '../components/FormMesin'
import NavBar from '../components/NavBar'

function TambahMesin() {
  return (
    <div className='tambahMesin'>
      <NavBar />
      <div className='container'>
        <h1 className='text-center fw-bold mt-3 mb-5'>Tambah Mesin</h1>
        <FormMesin 
          create={true}
        />
      </div>
    </div>
  )
}

export default TambahMesin