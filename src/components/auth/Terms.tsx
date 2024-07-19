import Link from "next/link";

export default function Terms() {
  const TOS_HREF = "/tos"
  const PRIVACY_HREF = "/privacy"
  return (
    <div className="text-xs text-mediumGrey mt-5 font-light">
        {'By clicking "Continue with Google / Email" you agree to our User'} 
        <Link href={TOS_HREF} className="underline">Terms of Service</Link> 
        {' and '}
        <Link href={PRIVACY_HREF} className="underline">Privacy Policy</Link>
    </div>
  );
}
