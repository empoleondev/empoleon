import { Image, SimpleGrid, Text } from '@empoleon/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@empoleon/dropzone';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { Text, Image, SimpleGrid } from '@empoleon/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@empoleon/dropzone';

function Demo() {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </div>
  );
}
`;

function Demo() {
  const [files, setFiles] = createSignal<FileWithPath[]>([]);

  const previews = files().map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
        <Text ta="center">Drop images here</Text>
      </Dropzone>

      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </div>
  );
}

export const preview: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
