import { Container, Typography,  Paper } from "@mui/material";
import { useState , useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export type Datas = {
    id: number;
    price: number;
    category: string;
    createdAt:string;
}

function PurchaseHistory() {
    const nav1 = useNavigate();
const [purchase,setPurchased] = useState<Datas[] | null>();



    useEffect(() => {
        const url = 'https://2ylq5g-8080.csb.app/purchase';
        axios.get(url).then((response) => {
            console.log(response.data)
            setPurchased(response.data);
            

        })
    }, [])
  return (
    <>
    <Container>
       <Typography variant="h3" sx={{cursor:"pointer",height:"8vh",width:"15vw",textAlign:"center", color:"red",bgcolor:"grey"}}><div onClick={()=>{nav1("/")}}>Home</div></Typography> 
        <Typography variant="h4" sx={{width:"80%",margin:"0 auto",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center" ,bgcolor:"#FFFFf",gap:"6"}}>
            Purchase History
            {purchase?purchase.map((data,index:number)=>(
                  <Paper elevation={6} sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"25vh",width:"40vw",bgcolor:"#FFF",mt:"5%"}}>
                  <Typography variant="h4">Price: &#8377;{data.price}</Typography>
                  <Typography variant="h5">Category: {data.category}</Typography>
                  <Typography variant="h6">Date: {data.createdAt}</Typography>
              </Paper>
            )):null
               
            }
           
        </Typography>
    </Container>
    </>
  )
}

export default PurchaseHistory

