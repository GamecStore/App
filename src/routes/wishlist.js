const express=require("express")
const router=express.Router()

router.get('/',(req,res)=>{
res.render('pages/wishlist')
})
module.exports=router