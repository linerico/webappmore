import React from 'react';
import {Link} from 'react-router-dom';

function forgotPassword() {
  return (
    <div className='forgotPassword d-flex'>
        <div className='leftSide'>
          <img src='https://more-app-bucket.s3.ap-southeast-1.amazonaws.com/logo.jpeg' className='w-full img-side' />
        </div>
        <div className='rightSide w-100'>
          <div className='mt-5 p-3 w-75'>
            <h2 className='text-center fw-bold mb-5'>LUPA KATA SANDI</h2>
            <p className='m-0 fs-6 fw-bold'>Silahkan masukan Email dan No. Telepon anda.</p>
            <p className='m-0 fs-6 fw-bold'>Password akan dikirimkan ke email anda.</p>
            <form>
                <input name='code' className='form-control rounded-pill mt-3' type='email' placeholder='Alamat Email'/>
                <input name='code' className='form-control rounded-pill mt-3 mb-3' type='tel' pattern='[0-9]{12}' placeholder='No. Telepon'/>

                <Link to='/'>
                  <input name='verifikasi' className='btn btn-primary btn-lg mt-3 w-100 rounded-pill fw-bold' type='submit'/>
                </Link>
                <br/>
                <Link to='/'>
                  <button className='btn btn-secondary btn-lg mt-3 mb-5 w-100 rounded-pill fw-bold'>
                    Batal
                  </button>
                </Link>
                
            </form>
          </div>
        </div>
    </div>
  )
}

export default forgotPassword