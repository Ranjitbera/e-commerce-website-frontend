import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export type Datas = {
    price: number,
    category: string
}
function Home() {
    const [open, setOpen] = useState<boolean>(true);
    const [product, setProduct] = useState<Datas[] | null>();
    const [product1, setProduct1] = useState<Datas[] | null>();
    const [filter, setFilter] = useState<string | null>();
    const [filter1, setFilter1] = useState<string | null>();
    
    useEffect(() => {
        const url = 'http://localhost:8080/';
        axios.get(url).then((response) => {
            console.log(response.data)
            setProduct(response.data);
            setProduct1(response.data);

        })
    }, [])

    const filterHandler = ()=>{
  
        if(filter){
            const cat = product1?product1.filter((curr)=>{
                return curr.category==filter;
            }):null;
            setProduct(cat);

        }
        
        if(filter1 && filter){
          if(filter1=="500"){
            const cat = product1?product1.filter((curr)=>{
                return curr.price<=500 && curr.category==filter;
            }):null;
            setProduct(cat);
          }else if(filter1>'500' && filter1<='1000'){
            const cat = product1?product1.filter((curr)=>{
                return curr.price>500 && curr.category==filter && curr.price<=1000;
            }):null;
            setProduct(cat);
          }else{
            const cat = product1?product1.filter((curr)=>{
                return curr.price>1000 && curr.category==filter;
            }):null;
            setProduct(cat);

          }
        }
    }


    return (<>

        <Container>
            <Typography sx={{
                my: 3, color: "white", height: "10vh",
                width: "100%", display: "flex",
                alignItems: "center", justifyContent: "space-between"
            }}><Typography variant="h3">MyShop</Typography>
     <Paper elevation={5} sx={{height:"15vh",width:{xs:"25vw",md:"20vw"}, border:"1px solid yellow",ml:"-11%"}}>
                <Typography variant="h6" sx={{ml:"38%"}}>Filter</Typography>
        <Typography sx={{display:"flex",justifyContent:"space-between"}}>
                <Typography>
                <select name="category" placeholder="category" onChange={(e)=>setFilter(e.target.value)}>
                <option id="category">Category</option>
                <option value="Watch">Watch</option>
                <option value="Earphone">Earphone</option>
                <option value="Shoe">Shoe</option>
            </select>
            </Typography>
            <Typography>
                <select name="Price" placeholder="Price" onChange={(e)=>setFilter1(e.target.value)}>
                <option id="Price">Price</option>
                <option value="500" typeof="number">Below 500</option>
                <option value="501" typeof="number">500-1000</option>
                <option value="502" typeof="number">Above 1000</option>
            </select>
            </Typography>
        </Typography>
       
    </Paper>
                <Typography sx={{ position: "relative", cursor: "pointer" }}><img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="not found" height={"40px"} width={"40px"} /></Typography>
                <Typography sx={{
                    position: "absolute",
                    height: "30px", width: "30px",
                    borderRadius: "50%", background: "red",
                    alignItems: "center", display: "flex",
                    justifyContent: "center",
                    ml: "75%", mt: "-3%"
                }}>1</Typography>

            </Typography>

            <Typography sx={{display:"flex", justifyContent:"center",alignItems:"center",mt:"3%"}}>
            <Button variant="contained" onClick={filterHandler}>Apply</Button>
        </Typography>
            <Typography variant="h4" sx={{ display: "flex" }}>Store Item</Typography>
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
                            <Typography variant='h5'>Price: {data.price}</Typography>
                            <Typography sx={{ mt: 2 }}>Category: {data.category}</Typography>
                            <Button variant="contained" sx={{ mt: 2 }}>+ Add To Cart</Button>
                        </Box>
                    </Paper>
                )) : null}
            </Box>

        </Container >

    </>

    )
}
export default Home;