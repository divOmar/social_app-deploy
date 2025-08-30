


import nodemailer from "nodemailer"


export const SendEmailServices=async({
    to,
    subject,
    html
}
)=>{
    try {
        const transporter =nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }

        })
    const info = await transporter.sendMail({
    from: `"Maddison Foo Koch" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
    })
    return info 
    } 
    catch (error) {
  console.error("SendEmailServices Error:", error);
  return null;
}

}