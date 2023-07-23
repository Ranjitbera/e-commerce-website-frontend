import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export type Datas = {
    price: number,
    category: string
}
function Home() {
    const [open,setOpen] = useState<boolean>(true);
    const [product, setProduct] = useState<Datas[] | null>();
    const [filter, setFilter] = useState<string | null>();

    useEffect(() => {
        const url = 'http://localhost:8080/';
        axios.get(url).then((response) => {
            console.log(response.data)
            setProduct(response.data);
        })
    }, [])

    
    return (<>

        <Container>
            <Typography sx={{
                my: 3, color: "white", height: "10vh",
                width: "100%", display: "flex",
                alignItems: "center", justifyContent: "space-between"
            }}><Typography variant="h3">MyShop</Typography>
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
            <Typography variant="h4" sx={{ display: "flex" }}>Store Item</Typography>
            <Typography> <select name="category" placeholder="category">
                        <option >Category</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Movie">Movie</option>
                    </select></Typography>
            <Box sx={{
                pt: 4, display: "flex", flexDirection: { xs: "column", md: "row" },
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                gap: "6vh"

            }}
            >

                {product?product.map((data: Datas, index: number) => (
                   <Paper key={index} elevation={6} sx={{borderRadius:"3%"}} >
                   <Box sx={{ m: 3, textAlign: "center" }}>
                       <Typography variant='h5'>Price: {data.price}</Typography>
                       <Typography sx={{ mt: 2 }}>Category: {data.category}</Typography>
                       <Button variant="contained" sx={{ mt: 2 }}>+ Add To Cart</Button>
                   </Box>
               </Paper>
                )):null}
            </Box>

        </Container >

    </>

    )
}
export default Home;