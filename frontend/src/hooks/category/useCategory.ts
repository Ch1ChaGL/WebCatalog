import { CategoryService } from '@/services/category/category.service';
import { useQuery } from '@tanstack/react-query';

export const useCategory = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get all category'],
    initialData: [],
    queryFn: () => CategoryService.getAll(),
  });

  return { data, isFetching, isError, isSuccess };
};
