import React, {useState, useContext} from 'react';
import { AuthContext } from "../context/auth"
import { Link, useHistory, Redirect } from 'react-router-dom';
import "../styles/StartPage.css";
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

//login udah connect ke api

const Login = () =>{
  const { isAuthenticated, loginSuccess, loginFailed } = useContext(AuthContext)
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const userLogin = async() => {
    const user = {email, password}
    try{
      const res = await axios.post(`${baseUrl}/authentications`, user)
      localStorage.setItem("accessToken", res.data.data.accessToken)
      localStorage.setItem("refreshToken", res.data.data.refreshToken)
      setEmail("")
      setPassword("")
      loginSuccess()
      // console.log(res)
      // history.push("/pabrik")
    } catch (err){
      if(err.response.data.message === "Email yang ada masukan belum terverifikasi") {
        localStorage.setItem("lastEmail", email)
        localStorage.setItem("lastPassword", password)
        await axios.post(`${baseUrl}/users/sendverifikasi`, {email});
        history.push('/verification')
      }
      console.log(err)
      setIsError(true)
      setError(err.response.data.message)
      setEmail("")
      setPassword("")
      setTimeout(() => {
        setIsError(false)
        setError("")
      }, 2000)
      loginFailed()
      console.log('error: ', err.response.data.message)

    }
    
  }
  if(isAuthenticated){
    return <Redirect to="/pabrik"/>
  }

  return (
    <div className='login d-flex'>
      <div className='leftSide'>
        <img src='/assets/logo.jpeg' className='w-full img-side' />
      </div>
      <div className='rightSide w-100'>
        <div className='mt-5 p-3 w-75'>
          <h2 className='text-center fw-bold mb-5'>MASUK</h2>

            <input value={email} name='email' className='form-control rounded-pill' type='email' placeholder='Alamat Email' onChange={(e) => setEmail(e.target.value)}/>
            <input value={password} name='password' className='form-control rounded-pill mt-3 mb-3' type='password' placeholder='Kata Sandi' onChange={(e) => setPassword(e.target.value)}/>
            <p className='text-end'><Link to='/forgotpassword'>Lupa Kata Sandi?</Link></p>
            <br />
            {isError && (
              <div>
                {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
              </div>
            )}
            <button className='btn btn-primary btn-lg mt-3 mb-5 w-100 rounded-pill fw-bold' onClick={userLogin}>Submit</button>
            {/* <Link to='/pabrik'>
              <input name='signin' className='btn btn-primary btn-lg mt-3 mb-5 w-100 rounded-pill fw-bold' type='submit' onClick={console.log("masukk pabrik")}/>
            </Link> */}


          <p className='mt-5  text-center'>Belum punya akun? <Link to='/signup'> Daftar</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login