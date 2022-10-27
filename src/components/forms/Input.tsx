import { Label } from '@radix-ui/react-label';
import React, { InputHTMLAttributes } from 'react';

type inputProps = {
  title: string;
}

export const Input = ({ title, ...props }: inputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className='space-y-1'>
      <Label htmlFor={props.name}>{title}</Label>
      <input name={props.name} 
      className="w-full rounded-md bg-neutral-50 border-2 border-gray-200 focus:border-primary focus:ring-primary" 
      {...props} />
    </div>
  );
}