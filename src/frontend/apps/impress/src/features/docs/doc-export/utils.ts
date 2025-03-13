import {
  COLORS_DEFAULT,
  DefaultProps,
  UnreachableCaseError,
} from '@blocknote/core';
import { IParagraphOptions, ShadingType } from 'docx';

export function downloadFile(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export function docxBlockPropsToStyles(
  props: Partial<DefaultProps>,
  colors: typeof COLORS_DEFAULT,
): IParagraphOptions {
  return {
    shading:
      props.backgroundColor === 'default' || !props.backgroundColor
        ? undefined
        : {
            type: ShadingType.SOLID,
            color:
              colors[
                props.backgroundColor as keyof typeof colors
              ].background.slice(1),
          },
    run:
      props.textColor === 'default' || !props.textColor
        ? undefined
        : {
            color: colors[props.textColor as keyof typeof colors].text.slice(1),
          },
    alignment:
      !props.textAlignment || props.textAlignment === 'left'
        ? undefined
        : props.textAlignment === 'center'
          ? 'center'
          : props.textAlignment === 'right'
            ? 'right'
            : props.textAlignment === 'justify'
              ? 'distribute'
              : (() => {
                  throw new UnreachableCaseError(props.textAlignment);
                })(),
  };
}
