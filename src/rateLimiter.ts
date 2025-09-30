import type { NextFunction,Request,Response } from "express";
interface RateLimit{
    count:number,
    expiryTime:number
}
const RateLimitStore = new Map<string, RateLimit>();
const MAX_REQ=20;
const WINDOW_MS = 60 * 60 * 1000;



export default function rateLimiter(req:Request,res:Response,next:NextFunction){
   
    if(!req.ip){
        res.json({
            success:false,
            msg:"ip is missing"
        })
        return
    }
  
    const existDevice =RateLimitStore.get(req.ip)
    if(!existDevice){   
        RateLimitStore.set(req.ip,{
            count:1,
            expiryTime:Date.now()+WINDOW_MS
        })
        next()
        return

    }
    
    if(existDevice?.expiryTime<Date.now()){
        existDevice.count=0
        existDevice.expiryTime=Date.now()+WINDOW_MS
    }
    if(existDevice?.count>=MAX_REQ){
        res.status(429).json({
            success:false,
            msg:"too many requests"
        })
        return
    }

    
    existDevice.count++
    next()
    return

}