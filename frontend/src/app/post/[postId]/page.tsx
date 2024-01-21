import PostPage from '@/components/screens/post/PostPage';

const DynamicPost = ({ params }: { params: { postId: string } }) => {
  return <PostPage postId={params.postId as string} />;
};

export default DynamicPost;
