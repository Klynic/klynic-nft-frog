import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { CovalentClient } from "@covalenthq/client-sdk";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { useState } from 'hono/jsx';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',

 // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', (c : any) => {
  
  const { buttonValue, inputText, status } = c
  const fruit = inputText || buttonValue
  return c.res({
    action: '/submit',
    image: 'https://cdn.pixabay.com/photo/2022/02/26/01/43/nft-7035115_640.jpg', 
    intents: [
      <TextInput placeholder="Enter your eth wallet address..." />,
      <Button value="eth">Just a feather-soft tap will do the trick!</Button>,
    ],
  })
})

  app.frame('/submit', async (c:any) => {
    const { buttonValue } = c
    const client = new CovalentClient("Your API KEY");
    
    
    let valueData
    let valueData1
    let valueData2

    let valueData3
    let valueData4
    let valueData5


    if (buttonValue === "eth"){
      const resp = await client.NftService.getNftsForAddress("eth-mainnet",`${c.inputText}`);
      valueData = resp.data.items[0].contract_name;

    }

    if (buttonValue === "eth"){
      const resp = await client.NftService.getNftsForAddress("eth-mainnet",`${c.inputText}`);
      valueData1 = resp.data.items[0].contract_address;
    }

    if (buttonValue === "eth"){
      const resp = await client.NftService.getNftsForAddress("eth-mainnet",`${c.inputText}`);
      valueData2 = resp.data.items[0].type;
    }



    if (buttonValue === "eth"){
      const resp = await client.NftService.getNftsForAddress("eth-mainnet",`${c.inputText}`);
      valueData3 = resp.data.items[1].contract_name;
    }


    if (buttonValue === "eth"){
      const resp = await client.NftService.getNftsForAddress("eth-mainnet",`${c.inputText}`);
      valueData4 = resp.data.items[1].contract_address;
    }

    if (buttonValue === "eth"){
      const resp = await client.NftService.getNftsForAddress("eth-mainnet",`${c.inputText}`);
      valueData5= resp.data.items[1].type;
    }

    return c.res({
      image: (
        <div style={{ color: 'white', fontSize: 30, display: 'flex', paddingLeft : 20, flexDirection : 'column', }}>
            <p style={{color : 'white'}}>Contract 1 Name : <span style={{color : 'yellow', paddingLeft : 30}}> {valueData}</span></p>
            <p style={{color : 'white'}}>Contract 1 Address : <span style={{color : 'yellow', paddingLeft : 30}}> {valueData1}</span></p>
            <p style={{color : 'white'}}>Contract 1 Type : <span style={{color : 'yellow', paddingLeft : 30}}> {valueData2}</span></p>


            <p style={{color : 'white'}}>Contract 2 Name : <span style={{color : 'yellow', paddingLeft : 30}}> {valueData3}</span></p>
            <p style={{color : 'white'}}>Contract 2 Address : <span style={{color : 'yellow', paddingLeft : 30}}> {valueData4}</span></p>
            <p style={{color : 'white'}}>Contract 2 Type : <span style={{color : 'yellow', paddingLeft : 30}}> {valueData5}</span></p>
        </div>
      ),
    
    intents:[
      <Button.Link href="https://www.covalenthq.com/platform/#/">Free Covalent API key</Button.Link>,
      <Button.Reset>Full Circle</Button.Reset>
     ]
   })
  })

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
