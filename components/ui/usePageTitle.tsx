import { useEffect } from 'react';

interface UsePageTitleOptions {
  prefix?: string;
  suffix?: string;
}


export const usePageTitle = (
  title: string,
  options: UsePageTitleOptions = {}
) => {
  const {
    prefix = 'Hoalen - Actioneo',
    suffix = '',
  } = options;

  useEffect(() => {
    const parts = [
      suffix? '': prefix,
      title,
      suffix
    ].filter(Boolean); 

    document.title = parts.join(' | ');

    return () => {
      document.title =   '';
    };
  }, [title, prefix, suffix]);
};
