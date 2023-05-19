const express=require("express")
const router=express.Router()

router.get('/',(req,res)=>{
res.render('pages/admin/adminindex')
})
module.exports=router