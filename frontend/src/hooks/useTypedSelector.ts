import { TypeRootSate } from '@/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<TypeRootSate> = useSelector;
