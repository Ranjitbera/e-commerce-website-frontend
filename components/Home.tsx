import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigation ,useNavigate} from 'react-router-dom'
import axios from "axios";
// import ShoppingCart from './ShoppingCart'

export type Datas = {
    id: number;
    price: number;
    category: string;
    quantity:number;
}

const Home: React.FC = () => {
    const nav = useNavigate()
    const [open, setOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<Datas[] | null>();
    const [product1, setProduct1] = useState<Datas[] | null>();
    const [cartProduct, setCartProduct] = useState<Datas[] | null>([]);
    const [filter, setFilter] = useState<string | null>();
    const [filter1, setFilter1] = useState<string | null>();

    useEffect(() => {
        const url = 'https://2ylq5g-8080.csb.app/';
        axios.get(url).then((response) => {
            console.log(response.data)
            setProduct(response.data);
            setProduct1(response.data);

        })
    }, [])

    const productBuy = () =>{
        const url = 'https://2ylq5g-8080.csb.app/purchase';
        axios.post(url,{...cartProduct}).then((response)=>{
            console.log(response);
            console.log({...cartProduct})
            alert("Purchase Sucessfully");
            
        })
        setCartProduct(null)
    }

    const filterHandler = () => {

        if (filter) {
            const cat = product1 ? product1.filter((curr) => {
                return curr.category == filter;
            }) : null;
            setProduct(cat);

        }
console.log(filter1)
        if (filter1 && filter) {
            if(filter1 <="500") {
                const cat3 = product1 ? product1.filter((curr) => {
                    return curr.price <= 500 && curr.category == filter;
                }) : null;
                setProduct(cat3);
            }else if(filter1 > '500' && filter1 <= '1000') {
                const cat1 = product1 ? product1.filter((curr) => {
                    return curr.price > 500 && curr.category == filter && curr.price <= 1000;
                }) : null;
                setProduct(cat1);
            }else{
                const cat2 = product1 ? product1.filter((curr) => {
                    return curr.price > 1000 && curr.category == filter;
                }) : null;
                setProduct(cat2);

            }
        }
    }
    console.log(cartProduct)
        const [ sum, setSum] = useState<boolean>()
    return (<>
        {open &&
                <Typography sx={{width:"30%",height:"100%",bgcolor:"#fff",position:"absolute",ml:"70%",mt:"-2%",zIndex:"1"}}>
                <Button variant="contained" sx={{float:"right",mt:"2%",mr:"1%"}} onClick={()=>setOpen(false)}>X</Button>
     
                <Typography sx={{height:"12vh",width:"80%",bgcolor:"whitesmoke",margin:"0 auto",display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                     <Typography >Total Amount : 100000</Typography>
                     <Button variant="contained" onClick={productBuy}>Proceed To Buy</Button>
                 </Typography>
             {
                     cartProduct?.map((data,index:number) => {
          return     <>
                     <Paper elevation={5} sx={{height:"18vh",width:"80%",bgcolor:"white",mt:"10%",margin:"12% auto",display:"flex",justifyContent:"center",position:"sticky"}}>
                     <Box sx={{height:"15vh",width:"55%",bgcolor:"pink",mt:"1.5vh",display:"flex",flexDirection:"column",justifyContent:"center",}}>
                         <Typography sx={{ml:"10%"}}>Category: {data.category}</Typography>
                         <Typography sx={{display:"flex",width:"50%",justifyContent:"space-around",mt:"8%",ml:"3%"}}>
                             <Paper elevation={6} sx={{display:"flex",height:"20px",width:"20px",alignItems:"center",justifyContent:"center",cursor:"pointer"}} >-</Paper>
                             <span>0</span>
                             <Paper elevation={6} sx={{display:"flex",height:"20px",width:"20px",alignItems:"center",justifyContent:"center",cursor:"pointer"}} >+</Paper>
                         </Typography>
                     </Box>
                     <Box sx={{height:"15vh",width:"35%",bgcolor:"pink",mt:"1.5vh",display:"flex",flexDirection:"column"}}>
                         <Button variant="contained" sx={{height:"4vh",width:"3vw",mt:"10%",ml:"40%"}}>Delete</Button>
                         <Typography sx={{mt:'15%'}}>Price: {data.price}</Typography>
                     </Box>
                 </Paper>
               
               </>
                  
     })
     
             }
               
             </Typography>
        }


        <Container sx={{ position: "reletive" }}>
            <Typography sx={{
                my: 3, color: "brown", height: "10vh",
                width: "100%", display: "flex",
                alignItems: "center", justifyContent: "space-between"
            }}><Typography variant="h3">MyShop</Typography>
                <Paper elevation={5} sx={{ height: "10vh", width: { xs: "25vw", md: "20vw" }, border: "1px solid yellow", ml: "-11%" }}>
                    <Typography variant="h6" sx={{ ml: "38%" }}>Filter</Typography>
                    <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>
                            <select name="category" placeholder="category" onChange={(e) => setFilter(e.target.value)}>
                                <option id="category">Category</option>
                                <option value="Watch">Watch</option>
                                <option value="Earphone">Earphone</option>
                                <option value="Shoe">Shoe</option>
                            </select>
                        </Typography>
                        <Button variant="contained" onClick={filterHandler}>Apply</Button>
                        <Typography>
                            <select name="Price" placeholder="Price" onChange={(e) => setFilter1(e.target.value)}>
                                <option id="Price">Price</option>
                                <option value="500" typeof="number">Below 500</option>
                                <option value="501" typeof="number">Above 500</option>
                            </select>
                        </Typography>
                    </Typography>

                </Paper>
                <Button variant="contained" onClick={()=>{nav("/purchase")}}>Purchased History</Button>
                <Typography sx={{ cursor: "pointer" }}><img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="not found" height={"40px"} width={"40px"} onClick={() => setOpen(true)} /></Typography>
                
            </Typography>
           
            <Box sx={{
                pt: 4, display: "flex", flexDirection: { xs: "column", md: "row" },
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                gap: "6vh"

            }}
            >

                {product ? product.map((data: Datas, index: number) => (
                    <Paper key={index} elevation={6} sx={{ borderRadius: "3%" }} >
                        <Box sx={{ m: 3, textAlign: "center" }}>
                            <Typography variant='h5'>Price: &#8377;{data.price}</Typography>
                            <Typography sx={{ mt: 2 }}>Category: {data.category}</Typography>
                            <Button variant="contained" sx={{ mt: 2 }} onClick={() => 
                                setCartProduct((prevCartProduct) => [
                                ...(prevCartProduct || []),
                                data,
                                
                               
                                ])
                                }>+ Add To Cart</Button>
                        </Box>
                    </Paper>
                )) : null}
            </Box>

        </Container >

    </>

    )
}
export default Home;