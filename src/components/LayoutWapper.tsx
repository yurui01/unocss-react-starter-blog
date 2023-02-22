import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { metadata, navLinks } from '@/config';
import { useDark } from '@/hooks';

interface LayoutWapperProps {
  children: React.ReactNode;
}

export default function LayoutWapper({ children }: LayoutWapperProps) {
  const [isDark, updateDark] = useDark();

  const modeClassName = useMemo(() => {
    return isDark ? `dark:i-ph-moon-fill dark:text-gray` : `i-ph-sun-fill`;
  }, [isDark]);

  return (
    <div className="mx-auto px-4 sm:px-6 xl:px-0 xl:w-4xl sm:w-sm">
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-4">
          <div>
            <Link to="/" className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="mr-3 flex items-center w-10 h-10 select-none outline-none">
                  <img className="mr-3 rd-1" src={`/logo${isDark ? '-dark' : ''}.svg`} alt="logo" />
                </div>
                {typeof metadata.title === 'string' ? (
                  <div className="hidden text-2xl font-semibold sm:block">{metadata.title}</div>
                ) : (
                  metadata.title
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block flex-row space-x-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className="font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
              <a className={`${modeClassName} cursor-pointer w-6 h-6`} onClick={updateDark} />
            </div>
          </div>
        </header>
        <main className="flex-grow lt-md-p-l-0 lt-md-p-r-0">{children}</main>
        <footer>
          <div className="flex flex-col items-center justify-between px-4 py-8 mx-auto sm:flex-row">
            {/** copyright and link to github twitter */}
            <p className="text-sm text-truegray">© 2023 {metadata.author} All rights reserved.</p>

            <div className="flex space-x-4 items-center text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              {metadata.github && (
                <a href={metadata.github}>
                  <div className="i-carbon:logo-github" />
                </a>
              )}

              {metadata.twitter && (
                <a href={metadata.twitter}>
                  <div className="i-carbon:logo-twitter" />
                </a>
              )}

              {metadata.email && (
                <a href={`mailto:${metadata.email}`}>
                  <div className="i-carbon:email" />
                </a>
              )}

              {metadata.bilibili && (
                <a href={`mailto:${metadata.bilibili}`}>
                  <div className="i-ri:bilibili-line" />
                </a>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
