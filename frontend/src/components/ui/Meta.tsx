'use client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

export const titleMerge = (title: string): string => `${title} | Web Catalogue`;

interface ISeo {
  title: string;
  description?: string;
  image?: string;
}

const Meta: FC<PropsWithChildren<ISeo>> = ({
  title,
  children,
  description,
  image,
}) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}`;

  return (
    <>
      <Head>
        <title itemProp='headline'>{titleMerge(title)}</title>
        {description ? (
          <>
            <meta
              itemProp='description'
              name='description'
              content={description}
            />
          </>
        ) : (
          <></>
        )}
      </Head>
    </>
  );
};

// export default Meta;
