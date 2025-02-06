import React from 'react';
import Image from 'next/image';

export default function LogoComponent() {
  return (
    <div className="flex justify-center w-full  h-[25vh]">
      <Image
        src="/assets/mobile_logo_1.png"
        alt="logos"
        width={750}
        height={300}
        objectFit="cover"
        className=" "
      />
    </div>
  );
}
