// import http from "http";
import https from "https";
import zlib from "zlib";

// Enum alternative: using constants for request methods
export const RequestMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

/**
 * Sends an HTTP request.
 * @param {string} url - The endpoint URL.
 * @param {object} options - Options for the request, including headers and method.
 * @param {any} payload - Data to send in a POST request.
 * @returns {Promise<object>} - Returns a promise that resolves with the response.
 */
export const request = (url, options = {}, payload) => {
  // Set default method to GET if not provided
  options.method = options.method || RequestMethod.GET;

  // Determine protocol based on URL scheme
  const protocol = url.startsWith("https") ? https : http;

  return new Promise((resolve, reject) => {
    let data = "";

    // Initiate the request
    const req = protocol.request(
      url,
      { headers: options.headers, method: options.method },
      (res) => {
        // Handle gzip encoding if specified
        if (options.gzip) {
          const gzip = zlib.createGunzip();
          res.pipe(gzip);
          gzip.on("data", (chunk) => {
            data += chunk;
          });
          gzip.on("end", () => {
            resolve({ data, headers: res.headers, statusCode: res.statusCode });
          });
        } else {
          // For non-gzip responses
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve({ data, headers: res.headers, statusCode: res.statusCode });
          });
        }
      }
    );

    // Handle any request errors
    req.on("error", (e) => {
      reject(e);
    });

    // Send the payload for POST requests
    if (options.method === RequestMethod.POST) {
      if (typeof payload === "object") {
        req.write(JSON.stringify(payload));
      } else {
        req.write(payload);
      }
    }

    req.end();
  });
};

/**
 * Serializes cookies for headers.
 * @param {object} args - Object containing cookie values.
 * @returns {string} - Serialized cookie string.
 */
export const cookieSerialize = (args) => {
  return `fid=${args.fid}; uf=${args.uf}; _d=${args._d}; UID=${
    args._uid || args.UID
  }; vc3=${args.vc3};`;
};
