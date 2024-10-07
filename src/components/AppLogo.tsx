import React from 'react';
import { SiSololearn } from 'react-icons/si';

interface AppLogoProps {
  className: string
}

const AppLogo: React.FC<AppLogoProps> = ({ className = ""}) => (
    <div className="grid justify-center items-center w-full">
      <div className="flex justify-center text-slate-600 h-fit w-full border p-3 rounded-full">
        <span className="flex justify-center font-extrabold text-xl">
          Logo
        </span>
      </div>
    </div>
)
export default AppLogo;
