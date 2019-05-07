import { createImgProxyUrl } from "./utils";
export default (references, babel, options) => {
  references.forEach(referencePath => {
    const { parentPath } = referencePath;
    const argumentPath = parentPath.get("arguments")[0];
    const defaultResponsiveOptions = {
      types: [
        {
          type: "image/webp",
          ext: "webp"
        },
        {
          type: "image/jpg",
          ext: "jpg"
        }
      ],
      transformations: [
        {
          media: "(max-width:480px)",
          width: "640"
        },
        {
          media: "(max-width:768px)",
          width: "768"
        },
        {
          media: "(max-width:1024px)",
          width: "1024"
        },
        {
          media: "(max-width:1366px)",
          width: "1366"
        },
        {
          media: "(max-width:1600px)",
          width: "1600"
        },
        {
          media: "(max-width:1920px)",
          width: "1920"
        }
      ]
    };
    const requestedOptions = argumentPath.evaluate().value;

    const mergedOptions = {
      ...options,
      ...defaultResponsiveOptions,
      ...requestedOptions
    };

    const { types, transformations, ...imgProxyOptions } = mergedOptions;

    const sources = types.reduce((acc, typeConfig) => {
      const { type, ...transformOptions } = typeConfig;
      transformations.forEach(transformation => {
        const { media, ...processingOptions } = {
          ...transformOptions,
          ...transformation
        };

        acc.push({
          media,
          type,
          srcSet: createImgProxyUrl({
            ...imgProxyOptions,
            processingOptions
          })
        });
      });

      return acc;
    }, []);

    const wrapperPath = parentPath.get("parentPath").parentPath;
    const { parent: parentNode } = wrapperPath;

    if (babel.types.isExpressionStatement(parentNode)) {
      wrapperPath.remove();
    } else {
      parentPath.replaceWith(babel.types.valueToNode(sources));
    }
  });
};
