import { FavoritesService } from '@/services/favorites/favorites.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFavorites = (userId: string) => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get favorites'],
    initialData: [],
    queryFn: () => FavoritesService.getFavoritesUserPost(userId),
  });

  return { data, isFetching, isError, isSuccess };
};

export const useIsFavorites = (dto: { userId: number; postId: number }) => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: [`isFavorites ${dto.userId} ${dto.postId}`],
    initialData: false,
    queryFn: () => FavoritesService.isFavorites(dto),
  });

  return { data, isFetching, isError, isSuccess };
};

export const useToggleFavorites = (dto: { userId: number; postId: number }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (dto: { userId: number; postId: number }) =>
      FavoritesService.ToggleFavorites(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`isFavorites ${dto.userId} ${dto.postId}`],
      });
    },
  });

  return mutation;
};
