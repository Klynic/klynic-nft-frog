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

app.frame('/', (c) => {
  
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

  app.frame('/submit', async (c) => {
    let newData
    const { buttonValue } = c
    const client = new CovalentClient("cqt_rQmCBkqc6Cqxb3JkJ3vB8kcf87Dk");
    const neynar_client = new NeynarAPIClient(`${process.env.NEYNAR_API_KEY}`);


    if (buttonValue === "eth"){
      const resp = await client.NftService.getNftsForAddress("eth-mainnet",`${c.inputText}`);
      newData=resp.data.items[0]
    console.log(resp.data.items[0]);
  }

    return c.res({
      image: (
        <>
        {/* {data.map((singledata:any, index:any)=>( */}
          <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
          Contract_name : {newData}
      </div>
        {/* ))} */}
        </>
        
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