import Image from "next/image";
import Link from "next/link";

export default function NiaLogo({
  size = 50,
  href,
}: {
  size?: number;
  href?: string;
}) {
  const logo = (
    <Image
      src="/images/nia-logo.PNG"
      alt="NIA Logo"
      width={size}
      height={size}
    />
  );

  return href ? <Link href={href}>{logo}</Link> : logo;
}
