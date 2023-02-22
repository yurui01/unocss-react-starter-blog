import { formatDate } from '@/utils';

interface PostWapperProps {
  attributes: Record<string, any>;
  children: React.ReactNode;
}

export default function PostWapper({ attributes, children }: PostWapperProps) {
  return (
    <div className="w-4xl">
      <div className="flex flex-col items-center justify-between space-y-xl b-b-solid b-b-gray-3 b-b-1 pb-10 dark:b-b-gray-7">
        <span className="text-gray-6 text-lg font-normal dark:text-gray-4">{formatDate(attributes.date)}</span>
        <span className="text-dark text-5xl font-extrabold dark:text-light">{attributes.title}</span>
      </div>
      <div className="mt-10 prose">{children}</div>
    </div>
  );
}
