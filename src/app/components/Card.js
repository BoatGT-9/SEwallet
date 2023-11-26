import { CardContent } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import { parseUnits } from 'ethers';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// import { _ethers } from "ethers";
import { formatEther ,parseUnits} from "@ethersproject/units";
import { ethers } from "ethers";
import abi from '../abi.json'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import Swal from 'sweetalert2'
// import { MetaMask } from "@web3-react/metamask";
// import { initializeConnector } from "@web3-react/core";


// import { Balance } from '@mui/icons-material';

// const [BoatValue,setBoatValue] = useState (0);
const contractAddress = "0x67F6D236A48a0e500cbaA588E20ffADe6E17e77a";

const  Card = ( {balance,accounts,provider,}) => {
    const [boatValue, setBoatValue] = useState(0);
    
const handleBuy = event =>{
    setBoatValue(event.target.value);
};

const BoatBuy = async()=>{

    Swal.fire({
        text:"Buy Success Fully !!",
        // icon: "success"
        imageUrl: "https://gifs.eco.br/wp-content/uploads/2022/06/gifs-de-dinheiro-0.gif",
    });
    try{
        if(boatValue<=0){
            return;
        }
        const signer = provider.getSigner();
        const smartContract = new ethers.Contract(contractAddress, abi, signer);
        const buyValue = parseUnits(boatValue.toString(),"ether")
        const tx= await smartContract.buy({
            value:buyValue.toString(),
        });
        await Swal.fire("Buy success ");
        console.log("Transaction",tx.hash);
       }catch(err){
        console.log(err);
       }
};

  return (
    <div className='container '>
        <div className='card'>
            
            <CardContent>
                <h1 style={{textAlign:"center"}}>My wallet </h1>
                <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch',blur:"5px" },
      }}
      noValidate
      autoComplete="off"
    >
        
        {/* <TextField id="standard-basic" label="Address" variant="standard" value={accounts} /> */}
        <TextField  id="outlined-basic" label="Address" variant="outlined" value={accounts} />
        <TextField id="outlined-basic" label="Newbalance" variant="outlined" value={balance} />
        <h2>Buy</h2>
        <TextField id="outlined-basic" label="Buy" variant="outlined" value={boatValue} onChange={handleBuy} />
        <Stack direction="row" spacing={2} >
        <Button 
        variant="contained" 
        fullWidth
        onClick={BoatBuy}
        endIcon={<PaymentsOutlinedIcon/>}
        color="success"
        

        >ConFirm</Button>
        </Stack>
    </Box>
            </CardContent>
        </div>
    </div>
  )
}
export default Card;
