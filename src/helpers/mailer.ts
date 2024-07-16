import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import Link from 'next/link';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {

        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType == "VERIFY") {

            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 300000, //  5 min
            })
        } else if (emailType == "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 300000, //  5 min
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: "nextjs@email.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html:  `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          

        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse
    }

    catch (error: any) {
        console.error(`Error sending email: ${ error.message } `);
        throw new Error(error.message);

    }
}