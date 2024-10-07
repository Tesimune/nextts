import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = 'submit', className = '', ...props }) => (
  <button
    type={type}
    className={`${className} inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs uppercase tracking-widest active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150`}
    {...props}
  />
);

export default Button;
