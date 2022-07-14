/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
// const baseUrl = 'http://localhost:5000'

const forgotPassword = () => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [noTelpn, setNoTelpn] = useState("")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)

  const reset = async() => {
    try{
      const res = await axios.post(`${baseUrl}/users/forget`, {email, no_telepon:noTelpn})
      console.log(res.data)
      history.push('/')
    } catch (err) {
      console.log(err.response.data.message)
        setIsError(true)
        setError(err.response.data.message)
        setTimeout(() => {
          setIsError(false)
          setError("")
        }, 2000)
    }
  }


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
            {/* <form> */}
                <input value={email} name='code' className='form-control rounded-pill mt-3' type='email' placeholder='Alamat Email' onChange={(e)=>{setEmail(e.target.value)}}/>
                <input value={noTelpn} name='code' className='form-control rounded-pill mt-3 mb-3' type='tel' pattern='[0-9]{12}' placeholder='No. Telepon' onChange={(e)=>{setNoTelpn(e.target.value)}}/>
                {isError && (
                  <div>
                {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                    <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
                  </div>
                )}
                <button className='btn btn-primary btn-lg mt-3 w-100 rounded-pill fw-bold' onClick={reset}>Submit</button>
                {/* <Link to='/'>
                  <input name='verifikasi' className='btn btn-primary btn-lg mt-3 w-100 rounded-pill fw-bold' type='submit'/>
                </Link> */}
                <br/>
                <Link to='/'>
                  <button className='btn btn-secondary btn-lg mt-3 mb-5 w-100 rounded-pill fw-bold'>
                    Batal
                  </button>
                </Link>
                
            {/* </form> */}
          </div>
        </div>
    </div>
  )
}

export default forgotPassword