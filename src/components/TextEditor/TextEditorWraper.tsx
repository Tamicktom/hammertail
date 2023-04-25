//* Libraries imports
import { useState, useEffect } from 'react';
import type { PartialBlock } from "@blocknote/core";
import { CircleNotch } from '@phosphor-icons/react';

//* Components imports
import TextEditor from './TextEditor';

//* Custom hooks
import useDidMountEffect from "../../hooks/common/useDidMountEffect";
import useDebounce from '../../hooks/common/useDebounce';

//* Types imports
import type { Page } from "@prisma/client";

type Props = {
  page: Page;
}

export default function TextEditorWrapper(props: Props) {
  const [initialContent, setInitialContent] = useState<PartialBlock[] | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [content, setContent] = useState<PartialBlock[] | null>(null);
  const debouncedContent = useDebounce(content, 1200);

  useDidMountEffect(() => {
    getBlocks(props.page.id)
      .then((blocks) => {
        if (blocks)
          setInitialContent(blocks);
      }).finally(() => {
        setHasFetched(true);
      });
  });

  //refetch blocks when page changes
  useEffect(() => {
    if (hasFetched) {
      setHasFetched(false);
      getBlocks(props.page.id)
        .then((blocks) => {
          if (blocks)
            setInitialContent(blocks);
        }).finally(() => {
          setHasFetched(true);
        });
    }
  }, [props.page.id]);

  //save blocks when content changes
  useEffect(() => {
    if (debouncedContent) {
      saveBlocks(props.page.id, debouncedContent);
    }
  }, [debouncedContent]);

  return (
    <div className='w-full h-full min-h-screen blockStyle'>
      {
        hasFetched
          ? <TextEditor
            initialContent={initialContent}
            onEditorChange={(editor) => {
              setContent(editor.topLevelBlocks);
            }}
          />
          : <div className='w-full h-full flex justify-center items-center'>
            <CircleNotch size={64} className='animate-spin' />
          </div>
      }
    </div>
  );
}


async function getBlocks(pageId: string): Promise<PartialBlock[] | null> {
  //fake api call, create a promisse and return after 3 seconds
  const promisse = new Promise<PartialBlock[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([]);
    }, 5500);
  });

  const blocks = await promisse;
  if (blocks) return blocks;
  return null;
}

async function saveBlocks(pageId: string, blocks: PartialBlock[]) {
  //fake api call, create a promisse and return after 3 seconds
  const promisse = new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          message: "Saved",
          content: blocks
        }
      });
    }, 5500);
  });

  const response = await promisse;
  if (response.status === 200) {
    console.log(response.data);
  }

  return null;
}