/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { MesinList } from '../helpers/MesinList'
import { PabrikList } from '../helpers/PabrikList'
import HapusPabrikModal from './HapusPabrikModal'
import HapusMesinModal from './HapusMesinModal'
import TambahAnggota from './modal/tambahAnggota'
import TambahMemberModal from './modal/tambahMember'
import UbahMemberModal from './modal/ubahMemberModal'
import HapusMemberModal from './modal/hapusMemberModal'
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
const noImg = 'https://more-app-bucket.s3.ap-southeast-1.amazonaws.com/noimg.jpg'

const NavbarHeader = (props) => {

    const { step1, step2, homeId, mesinId } = props
    // const data = PabrikList?.find((row) => row.name.split(' ').join('-').toLocaleLowerCase() === homeId)
    const dataMesin = MesinList?.find((row) => row.name.split(' ').join('-').toLocaleLowerCase() === mesinId)

    const [show, setShow] = useState(false);
    const [showAnggota, setShowAnggota] = useState(false);
    const [addMember, setAddMember] = useState(false);
    const [ubahMember, setUbahMember] = useState(false);
    const [hapusMember, setHapusMember] = useState(false);
    const [hapusMesin, setHapusMesin] = useState(false);

    const [pabrik, setPabrik] = useState({})
    const [mesin, setMesin] = useState({})

    const token = localStorage.getItem("accessToken")


    function handleClose() {
        setShow(false)
    }

    function handleCloseAnggota() {
        setShowAnggota(false)
    }

    function handleCloseAddMember() {
        setAddMember(false)
    }

    function handleCloseUbahMember() {
        setUbahMember(false)
    }

    function handleCloseHapusMember() {
        setHapusMember(false)
    }

    function handleCloseHapusMesin() {
        setHapusMesin(false)
    }

    const getDetailPabrik = async() => {
        try{
            const res = await axios.get(`${baseUrl}/pabrik/id/${homeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setTimeout(() => {
            }, 2000)
            console.log(res)
            setPabrik(res.data.data.pabrik)
        } catch (err) {
            console.log(err.message)
        }
        
    }

    const getDetailMesin = async() => {
        try{
            const res = await axios.get(`${baseUrl}/pabrik/${homeId}/mesin/id/${mesinId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setMesin(res.data.data.mesin)
        } catch (err) {
            console.log(err.message)
        }
    }

    const router = useHistory()
    useEffect(() => {
        getDetailPabrik()
        getDetailMesin()
    }, [])

    return (
        <>
            <div className='px-5 my-2 border container rounded-3 shadow d-flex align-items-center py-2'>
                <Link to={'/pabrik'}>
                    <img
                        src={'/assets/home.svg'}
                        width={80}
                        height={80}
                    />
                    {/* </a> */}
                </Link>
                {
                    
                    step1 === 1 && homeId &&
                    <> 
                        <div className='me-2' >
                            
                            <img
                                src={'/assets/chevron-left.png'}
                                width={30}
                                height={80}
                            />
                        </div>
                        <div className={`d-flex ${!mesinId && "w-100"}`}>
                            <Link className='text-decoration-none text-black' to={`/pabrik/${homeId}`}>
                                <img
                                    className='rounded-circle'
                                    src={pabrik.gambar_pabrik!= null ? pabrik.gambar_pabrik : noImg}
                                    width={70}
                                    height={70}
                                />
                            </Link>
                            <div className='px-2'>
                                <p className='mb-0 text-nowrap'>{pabrik.nama_pabrik}</p>
                                <p className='mb-0 text-nowrap'>{`${pabrik.alamat_pabrik}, ${pabrik.kab_kota_pabrik}`}</p>
                                <a className='text-decoration-none' href={pabrik.peta_pabrik} target={"_blank"}>buka peta</a>
                            </div>
                            {!mesinId && <div className='d-flex justify-content-end align-content-center w-100'>
                                <div className='text-end'>
                                    <button
                                        className='btn btn-sm btn-primary rounded-pill'
                                        onClick={() => setShowAnggota(true)}
                                    >
                                        <img src='/assets/Profile.png' width={'20px'} /> Anggota
                                    </button>
                                    <button
                                        className='btn btn-sm btn-primary rounded-pill ms-2'
                                        onClick={() => router.push({
                                            pathname: '/ubah-pabrik', 
                                            state:{
                                                nama: pabrik.nama_pabrik,
                                                alamat: pabrik.alamat_pabrik,
                                                kabKota: pabrik.kab_kota_pabrik,
                                                provinsi: pabrik.provinsi_pabrik,
                                                peta: pabrik.peta_pabrik,
                                                foto: pabrik.gambar_pabrik
                                            }
                                        })}
                                    >
                                        <img src='/assets/Edit.png' width={'20px'} /> Ubah
                                    </button>
                                    <div>
                                        <button
                                            className='btn btn-sm btn-danger rounded-pill my-1'
                                            onClick={() => setShow(true)}
                                        >
                                            <img src='/assets/Trash.png' width={'20px'} /> Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </>

                }
                {step2 === 2 && homeId && mesinId &&
                    <>
                        <div className='me-2'>
                            <img
                                src={'/assets/chevron-left.png'}
                                width={30}
                                height={80}
                            />
                        </div>
                        <div className='d-flex' style={{
                            width:"800px"
                        }}>
                            <img
                                className='rounded-circle'
                                src={mesin.gambar_mesin}
                                width={70}
                                height={70}
                            />
                            <div className='px-2'>
                                <p className='mb-0 text-nowrap'>{mesin.nama_mesin}</p>
                                <p className='mb-0'>Tipe : {mesin.tipe_mesin}</p>
                                <p className='mb-0'>Merek : {mesin.merek_mesin}</p>
                            </div>
                        </div>

                        <div className='w-100 text-end'>
                            <button
                                className='btn btn-sm btn-primary rounded-pill ms-2'
                                onClick={() => router.push({
                                    pathname: '/ubah-mesin',
                                    state:{
                                        nama: mesin.nama_mesin,
                                        tipe: mesin.tipe_mesin,
                                        merek: mesin.merek_mesin,
                                        foto: mesin.gambar_mesin

                                    }
                                })}
                            >
                                <img src='/assets/Edit.png' width={'20px'} /> Ubah
                            </button>
                            <br />
                            <button
                                className='btn btn-sm btn-danger rounded-pill my-1'
                                onClick={() => setHapusMesin(true)}
                            >
                                <img src='/assets/Trash.png' width={'20px'} /> Hapus
                            </button>
                        </div>
                    </>
                }
            </div>

            <HapusPabrikModal
                show={show}
                handleClose={handleClose}
            />

            <TambahAnggota
                show={showAnggota}
                handleClose={handleCloseAnggota}
                setAddMember={setAddMember}
                setUbahMember={setUbahMember}
                setHapusMember={setHapusMember}
            />

            <TambahMemberModal
                show={addMember}
                handleClose={handleCloseAddMember}
            />

            <UbahMemberModal
                show={ubahMember}
                handleClose={handleCloseUbahMember}
            />

            <HapusMemberModal
                show={hapusMember}
                handleClose={handleCloseHapusMember}
            />

            <HapusMesinModal
                show={hapusMesin}
                handleClose={handleCloseHapusMesin}
            />

        </>
    )
}

export default NavbarHeader