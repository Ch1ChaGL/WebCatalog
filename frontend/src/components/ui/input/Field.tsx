import { FC, forwardRef } from 'react';
import { IField } from './field.interface';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, className, type = 'text', ...rest }, ref) => {
    return <div>a</div>;
  },
);

export default Field;
