import React from 'react';
import Image from 'next/image';

export default function LogoComponent() {
  return (
    <div className="flex justify-center  ">
      <Image
        src="/assets/mobile_logo_1.png"
        alt="logos"
        width={350}
        height={300}
        className=" "
      />
    </div>
  );
}
