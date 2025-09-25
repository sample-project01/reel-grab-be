import express from "express"
import encryptString from "./utils/utils.js"
import cors from "cors"

const app = express()
const allowedOrigin = 'http://reel-grab-fe.vercel.app'
app.use(express.json())
app.use(cors({
    origin:allowedOrigin,
}))

app.post("/reel",async(req,res)=>{
    
    
    try {
        
       
        const {url}= req.body
        
        if(!url){
             res.json({
            success:"false",
            msg:"url is empty"
        })
        return
        }
        const hash= encryptString(url)
        
        const response = await fetch("https://api.videodropper.app/allinone",{
            method:"GET",
            headers:{
                "Url":hash
            },
        })
        const data = await response.json()
        res.json({
            success:true,
            msg:data
        })
        
    } catch (error) {
        res.json({
            success:"false",
            msg:error
        })
        
    }
})

app.listen("3000",()=>console.log("server is running at 3000"))
