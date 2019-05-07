import { createImgProxyUrl } from "./utils";
export default (references, babel, options) => {
  references.forEach(referencePath => {
    const { parentPath } = referencePath;
    const argumentPath = parentPath.get("arguments")[0];

    const requestedOptions = argumentPath.evaluate().value;

    const mergedOptions = {
      ...options,
      ...requestedOptions
    };

    const { transformations, ...imgProxyOptions } = mergedOptions;

    const url = createImgProxyUrl({
      ...imgProxyOptions,
      processingOptions: transformations
    });

    const wrapperPath = parentPath.get("parentPath").parentPath;
    const { parent: parentNode } = wrapperPath;

    if (babel.types.isExpressionStatement(parentNode)) {
      wrapperPath.remove();
    } else {
      parentPath.replaceWith(babel.types.valueToNode(url));
    }
  });
};
