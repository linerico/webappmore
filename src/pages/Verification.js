import axios from 'axios';
import React, {useState, useContext} from 'react';
import { AuthContext } from "../context/auth"
// import {Logo} from '../assets/logo.jpeg';
import { Link, useHistory } from 'react-router-dom';

const baseUrl = 'http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

function Verification() {
  const { isAuthenticated, loginSuccess, loginFailed } = useContext(AuthContext)
  const history = useHistory()
  const [kode, setKode] = useState("")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const email = localStorage.getItem("lastEmail")
  const password = localStorage.getItem('lastPassword')
  
  const reSendVerfikasi = async() => {
    await axios.post(`${baseUrl}/users/sendverifikasi`, { email });
  }
  const verifyKode = async() => {
    try{
      const res = await axios.post(`${baseUrl}/users/verifikasi`, {email, kode})
      console.log("Masuk ", res)
      const resLog = await axios.post(`${baseUrl}/authentications`, {email, password})
      localStorage.setItem("accessToken", resLog.data.data.accessToken)
      localStorage.setItem("refreshToken", resLog.data.data.refreshToken)
      localStorage.removeItem("lastEmail")
      localStorage.removeItem("lastPassword")
      loginSuccess()
      history.push("/pabrik")
    } catch(err){
      setIsError(true)
      setError(err.response.data.message)
        setTimeout(() => {
          setIsError(false)
          setError("")
        }, 2000)
        loginFailed()
    }
  }

  return (
    <div className='verification d-flex'>
      <div className='leftSide'>
        <img src='/assets/logo.jpeg' className='w-full img-side' />
      </div>
      <div className='rightSide w-100'>
        <div className='mt-5 p-3 w-75'>
          <h2 className='text-center fw-bold mb-5'>VERIFIKASI</h2>
          <p className='m-0 fs-6 fw-bold'>Kode Verifikasi telah dikirimkan ke Email anda.</p>
          <p className='m-0 fs-6 fw-bold'>Silahkan masukan untuk mengverifikasi Email anda.</p>
            <input value={kode} name='code' className='form-control rounded-pill mt-3 mb-3' type='number' placeholder='Masukan Kode' onChange={(e) => {if(e.target.value.length<=4){setKode(e.target.value)}}}/>
            <Link onClick={reSendVerfikasi}><p>Kirim ulang kode verifikasi</p></Link>
            {isError && (
                  <div>
                {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                    <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
                  </div>
                )}
            <button onClick={verifyKode} name='verifikasi' className='btn btn-primary btn-lg mt-3 w-100 rounded-pill fw-bold'>
              Submit
            </button>
            {/* <Link onClick={verifyKode}>
              <input name='verifikasi' className='btn btn-primary btn-lg mt-3 w-100 rounded-pill fw-bold' type='submit' />
            </Link> */}
            <br />
            <Link to='/'>
              <button className='btn btn-secondary btn-lg mt-3 mb-5 w-100 rounded-pill fw-bold'>
                Batal
              </button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Verification