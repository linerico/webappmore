/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Tab } from 'bootstrap'
import { Tabs } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
// const baseUrl = 'http://127.0.0.1:5000'

function LaporanComp() {
    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")
    const [variabel, setVariabel] = useState([])
    const [picVariabel, setPicVariabel] = useState("")
    const [picNo, setPicNo] = useState(0)
    const [start, setStart] = useState("") 
    const [stop, setStop] = useState("")
    const [laporan, setLaporan] = useState([])
    const [rapLaporan, setRapLaporan] = useState([])
    const [nTemp, setNTemp] = useState()
    const [chart, setChart] = useState({
        series: [{
            name: 'Speed',
            data: [
                { x: 1660873101309, y: 0 }
            ]
        }],  
        options: {
            chart: {
                type: 'line',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: true
            },
            markers: {
                size: 0,
            },
            title: {
                text: 'Speed',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                labels: {
                },
                title: {
                    text: 'rpm'
                },
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: false,
            // y: {
            //   formatter: function (val) {
            //     return (val / 1000000).toFixed(0)
            //   }
            // }
            }
        },
    })
    const getVariabel = async() => {
        const res = await axios.get(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/laporan`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        // setVariabel(res.data.data.variabel)
        // console.log(res.data.data.variabel)
        const option = res.data.data.variabel.map((row, i)=>({
            "value":i+1,
            "label":row
        }))
        // console.log(option)
        setVariabel(option)
    }

    const convertDatetoTimeStamp = (date) => {
        var myDate = date;
        myDate = myDate.split("-");
        var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
        return newDate.getTime();
    }
    const convertTimeStamptoDate = (timestamp) => {
        const waktu = new Date(parseInt(timestamp))
        const myFormat = `${waktu.getDate()}-${waktu.getMonth()+1}-${waktu.getFullYear()}  ${waktu.getHours()}:${waktu.getMinutes()}:${waktu.getSeconds()}`
        return myFormat
    }
    const findIndexLaporan = (mylaporan, variabel) => {
        console.log(mylaporan, variabel)
        let myVar = ""
        if (variabel == ""){
            myVar=mylaporan[0].nama
        } else{
            myVar = variabel
        }
        // console.log(myVar)
        // console.log(mylaporan)
        const n =mylaporan.laporan.length
        for (let i=0; i< n; i++){
            // console.log(mylaporan.laporan[i].nama, myVar)
            if(mylaporan.laporan[i].nama == myVar){
                // console.log(i)
                return i
            }
        }
    }
    const getChart = async() => {
        const raw = {
            nama: picVariabel,
            start,
            stop
        }
        try{
            const res = await axios.post(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/laporanchart`, raw, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res.data.data.laporan)
            setChart({
                series: [res.data.data.laporan],
                options: {
                    chart: {
                        type: 'line',
                        stacked: false,
                        height: 350,
                        zoom: {
                            type: 'x',
                            enabled: true,
                            autoScaleYaxis: true
                        },
                        toolbar: {
                            autoSelected: 'zoom'
                        }
                    },
                    dataLabels: {
                        enabled: true
                    },
                    markers: {
                        size: 0,
                    },
                    title: {
                        text: picVariabel,
                        align: 'left'
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            inverseColors: false,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 90, 100]
                        },
                    },
                    yaxis: {
                        labels: {
                        },
                        title: {
                            // text: 
                        },
                    },
                    xaxis: {
                        type: 'datetime',
                    },
                    tooltip: {
                        shared: false,
                    // y: {
                    //   formatter: function (val) {
                    //     return (val / 1000000).toFixed(0)
                    //   }
                    // }
                    }
                },
            })
        } catch(err) {

        }
    }
    const getLaporan = async() => {
        // convertTimeStamptoDate(start)
        setStop(parseInt(stop)+86400000)
        // console.log(start, stop);
        // console.log(parseInt(stop)+86400000)
        const raw = {
            nama: picVariabel,
            start,
            stop
        }
        try{
            const res = await axios.post(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/laporan`, raw, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log(res.data.data.laporan)
            setLaporan(res.data.data.laporan)
            // console.log(res.data.data.laporan)
            // console.log(laporan)
            // console.log("laporan GetLaporan : ", laporan)
            const n =findIndexLaporan(res.data.data.laporan[res.data.data.laporan.length-1], raw.nama)
            // console.log(n)
            setPicNo(n)
            // console.log(n)
            
            // perapian()
        } catch(err) {
            const kosong = [{
                id_laporan: "asas",
                id_mesin: idMesin,
                laporan: [
                    {
                        nama: "null",
                        value: 0,
                        satuan:"null"
                    },
                ],
                timestamp: ""
            }]
            setLaporan(kosong)
            setPicNo(0)
            console.log("Get Laporan Error : ", err)
            
            // console.log(kosong)
            // if(err.response.status == 400){
            //     const kosong = [{
            //         id_laporan: "",
            //         id_mesin: idMesin,
            //         laporan: [
            //             {
            //                 nama: "null",
            //                 value: null,
            //                 satuan:"null"
            //             }
            //         ],
            //         timestamp: ""
            //     }]
            //     setLaporan(kosong)
            //     setPicNo(0)
            //     console.log(kosong)
            // }
            
        }
    }

    const callLaporan = async()=> {
        getLaporan()
        getChart()
    }
    useEffect(() => {
        getVariabel()
    }, [])
    return (
        <div>
            <div className='row align-items-center'>
                <div className='col-3'>
                    <label>Pilih Variabel</label>
                    <select className='form-control' onChange={(e)=> {
                        setPicVariabel(e.target.value)
                    }}>
                        {
                            variabel.map(a => (
                                <option>{a.label}</option>
                            ))
                        }
                    </select>
                </div>

                <div className='col-3'>
                    <label>Tanggal Mulai</label>
                    <input className='form-control' type='date' onChange={(e)=>{setStart(convertDatetoTimeStamp(e.target.value.split("-").reverse().join("-")))}}/>
                </div>

                <div className='col-3'>
                    <label>Tanggal Berakhir</label>
                    <input className='form-control' type='date' onChange={(e)=>{setStop(convertDatetoTimeStamp(e.target.value.split("-").reverse().join("-")))}}/>
                </div>

                <div className='col-3'>
                    <button className='btn btn-primary w-100' onClick={(e) => callLaporan()}>Tampilkan</button>
                </div>
            </div>
            <div className='mt-5'>
                <Tabs
                    defaultActiveKey="TableView"
                >
                    <Tab eventKey="TableView" title="Table View">
                        <div className='mt-5'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">#</th> */}
                                        <th scope="col">Waktu Pencatatan</th>
                                        <th scope="col">Hasil</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {   
                                        laporan.map((row, i) => (
                                            
                                            (row.laporan[picNo].value != undefined) ? 
                                                <tr>
                                                    <td>{convertTimeStamptoDate(row.timestamp)}</td> 
                                                    <td>{`${row.laporan[picNo].value} (${row.laporan[picNo].satuan})`}</td>
                                                </tr>
                                                :<></>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                    <Tab eventKey="ChartView" title="Chart View">
                        <ReactApexChart options={chart.options} series={chart.series} type="area" height={500}  />
                    </Tab>
                </Tabs>
            </div>

            
        </div>
    )
}

export default LaporanComp