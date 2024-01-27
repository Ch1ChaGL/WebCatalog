import { FavoritesService } from '@/services/favorites/favorites.service';
import { useQuery } from '@tanstack/react-query';

export const useFavorites = (userId: string) => {
  console.log(userId);
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get favorites'],
    initialData: [],
    queryFn: () => FavoritesService.getFavoritesUserPost(userId),
  });

  return { data, isFetching, isError, isSuccess };
};
