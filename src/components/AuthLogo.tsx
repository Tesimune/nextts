import { SiSololearn } from 'react-icons/si';

interface AppLogoProps {
}

const AuthLogo: React.FC<AppLogoProps> = (props) => (
  <div className="grid justify-center items-center w-full">
    <div className="flex justify-center text-slate-600 border p-4 rounded-full">
      <span className="flex justify-center font-extrabold text-xl">
        Logo
      </span>
    </div>
  </div>
);

export default AuthLogo;
