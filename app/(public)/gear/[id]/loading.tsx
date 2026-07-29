import LoadingAnimation from '@/components/shared/LoadingAnimation';

const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4">
      <LoadingAnimation />
    </div>
  );
};

export default Loading;