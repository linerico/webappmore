import React from 'react'
import FormMesin from '../components/FormMesin'
import NavBar from '../components/NavBar'

function UbahMesin() {
  return (
    <div className='ubahMesin'>
        <NavBar/>
        <div className='container'>
            <h1 className='text-center fw-bold mt-3 mb-5'>Ubah Mesin</h1>
            <FormMesin/>
        </div>
    </div>
  )
}

export default UbahMesin