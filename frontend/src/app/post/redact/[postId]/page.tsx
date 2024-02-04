import PostPage from '@/components/screens/post/PostPage';
import RedactPostPage from '@/components/screens/profile/MainProfile/RedactPostPage/RedactPostPage';

const DynamicPost = ({ params }: { params: { postId: string } }) => {
  return <RedactPostPage postId={params.postId as string} />;
};

export default DynamicPost;
