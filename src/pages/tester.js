import React, { useEffect, useState } from 'react'

function ForgotPassword(props) {
  const { data } = props
  console.log(data)

  const [add, setAdd] = useState(0)
  // setAdd(data.length)

  useEffect(() => {
    if (data) {
      const length = data.length
      setAdd(length)
    }
  }, [data])

  const addData = () => {
    setAdd(
      add < 10 ? add + 1 : 10
    )
    let temp = add+1
    if(data.length <= temp){
      data.push(temp)
    }

  }

  let a = 5
  if ("sawe"){
    a =8
  }

  // useEffect(()=>{
  //   if(data.length <= add){
  //     let temp = data
  //     data.push(temp)
  //   }
  // },[])


  return (
    <>
      <div>
        {data.map((row, i) => (
          <div key={i} className={`${i % 2 === 0 ? 'bg-primary' : 'bg-warning'}`}>
            {row}
          </div>
        ))
        }
      </div>

      <div className='mt-5 px-5'>
        <button
          onClick={() => setAdd(
            add > 0 ? add - 1 : 0
          )}
        >kurang</button>
        {add}
        <button
          onClick={() => addData()}
        >tambah</button>
      </div>
    </>
  )
}

export default ForgotPassword