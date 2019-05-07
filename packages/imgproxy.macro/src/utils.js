import crypto from "crypto";

export const urlSafeBase64 = string =>
  new Buffer(string)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

export const hexDecode = hex => Buffer.from(hex, "hex");

export const sign = (salt, target, secret) => {
  const hmac = crypto.createHmac("sha256", hexDecode(secret));
  hmac.update(hexDecode(salt));
  hmac.update(target);
  return urlSafeBase64(hmac.digest());
};

export const createImgProxyUrl = ({
  encodeUrl = true,
  url,
  host,
  key,
  salt,
  processingOptions = {}
}) => {
  url = encodeUrl ? urlSafeBase64(url) : `plain/${url}`;

  const processingPath = Object.keys(processingOptions).reduce(
    (acc, processingOption) => {
      let processingOptionValue = processingOptions[processingOption];
      if (Array.isArray(processingOptionValue)) {
        processingOptionValue = processingOptionValue.join(":");
      }
      return `${acc}${processingOption}:${processingOptionValue}/`;
    },
    ""
  );

  const path = `/${processingPath}${url}`;
  const signature = key ? sign(salt, path, key) : `insecure`;

  const imgProxyUrl = `/${signature}${path}`;
  return host ? `${host}${imgProxyUrl}` : imgProxyUrl;
};
