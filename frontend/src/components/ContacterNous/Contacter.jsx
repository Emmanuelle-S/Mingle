import React, { useState } from 'react'

function Contacter() {
    const [Contacter, setContacter] = useState([])

    const fetchDataContact = async()=>{
        const response = await axios.get("http://localhost:5000/category/service/id:")
    }
  return (
    <div>
      
    </div>
  )
}

export default Contacter
