import '@tiptap/extension-text-style';

import {Command, Extension, GlobalAttributes} from '@tiptap/core';

type FontColorOptions = {
    types: string[];
};

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontColor: {
            /**
             * Set the font color
             */
            setFontColor: (fontColor: string) => ReturnType;
            /**
             * Unset the font color
             */
            unsetFontColor: () => ReturnType;
        };
    }
}

export const FontColor = Extension.create<FontColorOptions>({
    name: 'fontColor',

    defaultOptions: {
        types: ['textStyle'],
    },

    addGlobalAttributes(): GlobalAttributes {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontColor: {
                        default: null,
                        renderHTML: ({fontColor}) =>
                            fontColor
                                ? {
                                      style: `color: ${fontColor}`,
                                  }
                                : {},
                        parseHTML: ({style}) => style.color.replace(/['"]+/g, ''),
                        keepOnSplit: false,
                    },
                },
            },
        ];
    },

    addCommands(): {
        setFontColor?: (fontColor: string) => Command;
        unsetFontColor?: () => Command;
    } {
        return {
            setFontColor:
                fontColor =>
                ({chain}) =>
                    chain().setMark('textStyle', {fontColor}).run(),
            unsetFontColor:
                () =>
                ({chain}) =>
                    chain().setMark('textStyle', {fontColor: null}).run(),
        };
    },
});
