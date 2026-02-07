// components/Logo.tsx
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/assets/logo.png"
      alt="Logo"
      width={40}
      height={40}
      priority
    />
  );
}