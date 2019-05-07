import { createMacro } from "babel-plugin-macros";
import transformSources from "./transformSources";
import transformDefault from "./transformDefault";

export default createMacro(
  ({ references, babel, config = {} }) => {
    const {
      env_key = "IMGPROXY_KEY",
      env_salt = "IMGPROXY_SALT",
      env_host = "IMGPROXY_HOST",
      ...rest
    } = config;

    const envOptions = {
      key: process.env[env_key],
      salt: process.env[env_salt],
      host: process.env[env_host],
      ...rest
    };

    const { default: _default, sources } = references;

    if (sources) transformSources(sources, babel, envOptions);
    if (_default) transformDefault(_default, babel, envOptions);
  },
  {
    configName: "imgProxy"
  }
);
