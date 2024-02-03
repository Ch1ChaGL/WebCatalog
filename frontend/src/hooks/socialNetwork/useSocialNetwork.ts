import { SocialNetworkService } from "@/services/socialNetwork/socialNetwork.service";
import { useQuery } from "@tanstack/react-query";

export const useSocialNetwork = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: [`get social network`],
    initialData: [],
    queryFn: () => SocialNetworkService.getAll(),
  });

  return { data, isFetching, isError, isSuccess };
};
