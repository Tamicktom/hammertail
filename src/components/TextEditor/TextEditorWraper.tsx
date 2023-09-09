//* Libraries imports
import { useState, useEffect } from 'react';
import type { PartialBlock, BlockSchema } from "@blocknote/core";
import { CircleNotch } from '@phosphor-icons/react';

//* Components imports
import TextEditor from './TextEditor';

//* Custom hooks
import useDidMountEffect from "../../hooks/common/useDidMountEffect";
import useDebounce from '../../hooks/common/useDebounce';
import useSaveBlock from '../../hooks/mutations/useSaveBlock';
import useGetBlocks from '../../hooks/queries/useGetBlocks';

//* Types imports
import type { Page } from "@prisma/client";

type Props = {
  page: Page;
}

export default function TextEditorWrapper(props: Props) {
  const [content, setContent] = useState<PartialBlock<BlockSchema>[] | null>(null);
  const debouncedContent = useDebounce(content, 1200);
  const initialBlocks = useGetBlocks(props.page.id);
  const saveBlocks = useSaveBlock();

  useDidMountEffect(() => {
    if (initialBlocks.isSuccess) {
      setContent(initialBlocks.data);
    }
  });

  //refetch blocks when page changes
  useEffect(() => {
    initialBlocks.remove();
    initialBlocks.refetch();
  }, [props.page.id]);

  // save blocks when content changes
  useEffect(() => {
    if (debouncedContent) {
      saveBlocks.mutate({
        pageId: props.page.id,
        blocks: debouncedContent
      });
    }
  }, [debouncedContent]);

  return (
    <div className='w-full h-full min-h-screen blockStyle'>
      {
        initialBlocks.isSuccess && !initialBlocks.isLoading
          ? <TextEditor
            initialContent={initialBlocks.data}
            onEditorChange={(editor) => {
              setContent(editor.topLevelBlocks);
            }}
          />
          : <Loading />
      }
    </div>
  );
}

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <CircleNotch
        size={64}
        className='animate-spin fill-white'
      />
    </div>
  );
}