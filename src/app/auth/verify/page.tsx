import CodeInputForm from "@/components/auth/CodeInputForm";

export default function Verify() {
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary-700 tracking-wider">Verify</h1>
            <p className="text-sm text-secondary-700">Check your mail for the verification code</p>
            <CodeInputForm />
        </>
    );
}