import React, { useState ,useEffect} from 'react'

function Contacter() {
    const [Contacter, setContacter] = useState([])

    const fetchDataContact = async()=>{
        try{
            const response = await axios.get("http://localhost:5000/service/category/55")
            console.log('Response',response.data)
            setContacter(response.data);
        } catch (error){
            console.error("error fetching Contact", error.message|| error);
        }
        useEffect(() => {
            fetchDataContact();
          }, []);

    }
  return (
    <div>
      
    </div>
  )
}

export default Contacter
