var express=require('express')
var nodemailer=require('nodemailer')
const router=express.Router();

var smtpTransport = nodemailer.createTransport({
    service: "ak9709880345@gmail.com",
    auth: {
        user: "ak9709880345@gmail.com",
        pass: "123456Kai@"
    }
});

var rand,mailOptions,host,link;

router.get('/send',function(req,res){
    rand=Math.floor(100000 + Math.random() * 900000)
host=req.get('host');
link="http://"+req.get('host')+"/api/verify?id="+rand;
mailOptions={
    to : req.query.to,
    subject : "Please confirm your Email account",
    
    html : "Hello,otp is "+rand+" "
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
 if(error){
        console.log(error);
        res.status(400).json({
            message:'mail not send'
        })
 }else{
        console.log("Message sent: " + response.message);
        res.status(200).json({
            message:'mail send'
        })
     }
});
});

router.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.status(200).json({
                message:'user verified'
            })
        }
        else
        {
            console.log("email is not verified");
            res.status(400).json({
                message:'user is not verified'
            })
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
       
    }
    });
module.exports=router;
