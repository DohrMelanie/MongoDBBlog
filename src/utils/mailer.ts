import VerificationTemplate from "@/components/mailing/VerificationTemplate";
import CodeManager from "./code-manager";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";

class Mailer {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT || '587', 10),
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
    }
    async sendVerificationEmail(username: string, email: string) {
        const verificationCode = await CodeManager.generateCode(username);

        const html = await render(VerificationTemplate({ username, verificationCode }));

        await this.transporter.sendMail({
            from: "Rich Money Blogs <richmoneyblogs@gmail.com>",
            to: email,
            subject: "Verification Code",
            html: html,
        });

        return true;
    }
}

export default new Mailer();