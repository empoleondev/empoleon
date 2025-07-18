import { useEmpoleonStyleNonce } from '../EmpoleonProvider';
import { InlineStylesInput, stylesToString } from './styles-to-string/styles-to-string';

export interface InlineStylesProps extends InlineStylesInput {}

export function InlineStyles(props: InlineStylesInput) {
  const nonce = useEmpoleonStyleNonce();
  return (
    <style
      data-empoleon-styles="inline"
      nonce={nonce?.()}
      innerHTML={stylesToString(props) }
    />
  );
}
