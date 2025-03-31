import { Html } from "@react-email/components";

interface VerificationTemplateProps {
    username: string;
    verificationCode: string;
}

export default function VerificationTemplate({ username, verificationCode }: VerificationTemplateProps) {
    return (
        <Html>
            <h1>Welcome to Rich Money Blogs, {username}!</h1>
            <p>Please verify your email by entering the code below:</p>
            <p className="text-2xl font-bold text-secondary-700 tracking-wider">{verificationCode}</p>
        </Html>
    );
}