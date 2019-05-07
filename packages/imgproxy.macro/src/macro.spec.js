import plugin from "babel-plugin-macros";
import pluginTester from "babel-plugin-tester";

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: {
    "no usage": `import sign from './macro'`,
    "default usage": `
        import sign from "./macro";

        const url = sign({
            url: "https://avatars2.githubusercontent.com/u/621098?s=460&v=4"
        })
    `,
    "default sign usage": `
        import sign from "./macro";

        const url = sign({
            url: "https://avatars2.githubusercontent.com/u/621098?s=460&v=4",
            key: "4506f0f2154cb96e80f44186109a80cfe00e52659d466d24779c9aa374d5334cc98007185543510b1977384d594d75e4c7d6bf8efd694419c511711019d1c5e9",
            salt: "e7de466ad5326e6b3838e52d6006d8b262552b857cc8a1396e0d2b604c3f8ac38cef2c0f87ffb618828902cebe33f52329735d85bb4cc30116fd1b54763d55a9",
            host: "https://imgproxy.yourhost.com",
        })
    `,
    "default sign usage with transformations": `
        import sign from "./macro";

        const url = sign({
            url: "https://avatars2.githubusercontent.com/u/621098?s=460&v=4",
            key: "4506f0f2154cb96e80f44186109a80cfe00e52659d466d24779c9aa374d5334cc98007185543510b1977384d594d75e4c7d6bf8efd694419c511711019d1c5e9",
            salt: "e7de466ad5326e6b3838e52d6006d8b262552b857cc8a1396e0d2b604c3f8ac38cef2c0f87ffb618828902cebe33f52329735d85bb4cc30116fd1b54763d55a9",
            host: "https://imgproxy.yourhost.com",
            transformations: {
                width: "600"
            }
        })
    `,
    "responsive usage": `
        import { sources } from "./macro"

        const responsive = sources({
            url: "https://avatars2.githubusercontent.com/u/621098?s=460&v=4",
        })
    `,
    "responsive signed usage": `
        import { sources } from "./macro"

        const responsive = sources({
            key: "4506f0f2154cb96e80f44186109a80cfe00e52659d466d24779c9aa374d5334cc98007185543510b1977384d594d75e4c7d6bf8efd694419c511711019d1c5e9",
            salt: "e7de466ad5326e6b3838e52d6006d8b262552b857cc8a1396e0d2b604c3f8ac38cef2c0f87ffb618828902cebe33f52329735d85bb4cc30116fd1b54763d55a9",
            url: "https://avatars2.githubusercontent.com/u/621098?s=460&v=4"
        })
    `,
    "responsive with processing usage ": `
        import { sources } from "./macro"

        const responsive = sources({
            url: "https://avatars2.githubusercontent.com/u/621098?s=460&v=4",
            types: [
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
                    media: "(max-width:1600px)",
                    resize: "fill:1600:::"
                }
            ]
        })
    `
  }
});
