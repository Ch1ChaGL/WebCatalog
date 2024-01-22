import { InputHTMLAttributes } from 'react';

export interface IField extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
  error?: string;
}
