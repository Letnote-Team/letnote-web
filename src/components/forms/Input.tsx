import { Label } from '@radix-ui/react-label';
import React, { InputHTMLAttributes } from 'react';

type inputProps = {
  title: string;
}

export const Input = ({ title, ...props }: inputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className='space-y-1 2xl:text-base'>
      <Label className='text-[#3f3f3f]' htmlFor={props.name}>{title}</Label>
      <input name={props.name} 
      className="w-full px-4 py-2 placeholder:2xl:text-base placeholder:text-[#a5a5a5] rounded-md bg-[#FAFAFA] border border-[#DBDBDB] focus:border-primary focus:ring-primary" 
      {...props} />
    </div>
  );
}