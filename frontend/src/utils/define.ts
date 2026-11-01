/** Define a custom element once; tolerate the bundle being loaded twice (panel + card). */
export const safeDefine = (tag: string, ctor: CustomElementConstructor) => {
  if (!customElements.get(tag)) {
    customElements.define(tag, ctor);
  }
};

/** True when a Home Assistant frontend element is available (they are lazy loaded). */
export const haElement = (tag: string) => customElements.get(tag) !== undefined;
