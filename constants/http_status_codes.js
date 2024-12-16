const HTTP_STATUS_CODES = [
  {
    title: "1xx Informational",
    description: "Request received, continuing process.",
    codes: [
      {
        code: 100,
        message: "Continue",
        description: "Waiting for the client to emit the body of the request.",
      },
      {
        code: 101,
        message: "Switching Protocols",
        description:
          "The server is changing protocols and the client must follow.",
      },
      {
        code: 102,
        message: "Processing",
        description:
          "The server is processing the request but the client should wait.",
      },
      {
        code: 103,
        message: "Early Hints",
        description:
          "The server is sending a response with the headers before the final response.",
      },
    ],
  },
  {
    title: "2xx Success",
    description:
      "The action was successfully received, understood, and accepted.",
    codes: [
      {
        code: 200,
        message: "OK",
        description: "The request was successful.",
      },
      {
        code: 201,
        message: "Created",
        description:
          "The request was successful and a new resource was created.",
      },
      {
        code: 202,
        message: "Accepted",
        description: "The request was successful but the response is pending.",
      },
      {
        code: 203,
        message: "Non-Authoritative Information",
        description:
          "The request was successful but the returned information may be from another source.",
      },
      {
        code: 204,
        message: "No Content",
        description: "The request was successful but no content was returned.",
      },
      {
        code: 205,
        message: "Reset Content",
        description:
          "The request was successful and the client should reset the view.",
      },
      {
        code: 206,
        message: "Partial Content",
        description:
          "The request was successful and only a portion was returned.",
      },
      {
        code: 207,
        message: "Multi-Status",
        description:
          "The request was successful and the response is a DAV response.",
      },
      {
        code: 208,
        message: "Already Reported",
        description:
          "The members of a DAV binding have already been enumerated in a previous reply to this request, and are not being included again.",
      },
      {
        code: 226,
        message: "IM Used",
        description:
          "The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
      },
    ],
  },
  {
    title: "3xx Redirection",
    description:
      "Further action must be taken in order to complete the request.",
    codes: [
      {
        code: 300,
        message: "Multiple Choices",
        description:
          "The request has more than one possible response and the user can choose.",
      },
      {
        code: 301,
        message: "Moved Permanently",
        description: "The requested page has been moved to a new URL.",
      },
      {
        code: 302,
        message: "Found",
        description:
          "The requested page has been temporarily moved to a new URL.",
      },
      {
        code: 303,
        message: "See Other",
        description: "The requested page can be found under a different URL.",
      },
      {
        code: 304,
        message: "Not Modified",
        description:
          "The requested page has not been modified since the last request.",
      },
      {
        code: 305,
        message: "Use Proxy",
        description: "The requested page must be accessed through a proxy.",
      },
      {
        code: 306,
        message: "(Unused)",
        description: "This code was used in a previous version.",
      },
      {
        code: 307,
        message: "Temporary Redirect",
        description:
          "The requested page has been temporarily moved to a new URL.",
      },
      {
        code: 308,
        message: "Permanent Redirect",
        description:
          "The requested page has been permanently moved to a new URL.",
      },
    ],
  },
  {
    title: "4xx Client Error",
    description: "The request contains bad syntax or cannot be fulfilled.",
    codes: [
      {
        code: 400,
        message: "Bad Request",
        description: "The request cannot be fulfilled due to bad syntax.",
      },
      {
        code: 401,
        message: "Unauthorized",
        description:
          "The request cannot be fulfilled due to a lack of authentication.",
      },
      {
        code: 402,
        message: "Payment Required",
        description:
          "The request cannot be fulfilled due to a lack of payment.",
      },
      {
        code: 403,
        message: "Forbidden",
        description:
          "The request cannot be fulfilled due to a lack of permission.",
      },
      {
        code: 404,
        message: "Not Found",
        description: "The requested page does not exist.",
      },
      {
        code: 405,
        message: "Method Not Allowed",
        description: "The request method is not allowed.",
      },
      {
        code: 406,
        message: "Not Acceptable",
        description:
          "The requested page cannot be returned in the requested format.",
      },
      {
        code: 407,
        message: "Proxy Authentication Required",
        description: "The client must authenticate itself with the proxy.",
      },
      {
        code: 408,
        message: "Request Timeout",
        description:
          "The client did not produce a request within the time that the server was prepared to wait.",
      },
      {
        code: 409,
        message: "Conflict",
        description: "The request cannot be fulfilled due to a conflict.",
      },
      {
        code: 410,
        message: "Gone",
        description: "The requested page is no longer available.",
      },
      {
        code: 411,
        message: "Length Required",
        description:
          "The request cannot be fulfilled due to a lack of content-length.",
      },
      {
        code: 412,
        message: "Precondition Failed",
        description:
          "The request cannot be fulfilled due to a failed precondition.",
      },
      {
        code: 413,
        message: "Payload Too Large",
        description:
          "The request cannot be fulfilled due to the payload being too large.",
      },
      {
        code: 414,
        message: "URI Too Long",
        description:
          "The request cannot be fulfilled due to the URI being too long.",
      },
      {
        code: 415,
        message: "Unsupported Media Type",
        description:
          "The request cannot be fulfilled due to an unsupported media type.",
      },
      {
        code: 416,
        message: "Range Not Satisfiable",
        description: "The requested range cannot be returned.",
      },
      {
        code: 417,
        message: "Expectation Failed",
        description:
          "The expectation given in the request header could not be met.",
      },
      {
        code: 418,
        message: "I'm a teapot",
        description:
          "The server refuses the attempt to brew coffee with a teapot.",
      },
      {
        code: 421,
        message: "Misdirected Request",
        description:
          "The request was directed at a server that is not able to produce a response.",
      },
      {
        code: 422,
        message: "Unprocessable Entity",
        description:
          "The request was well-formed but was unable to be followed due to semantic errors.",
      },
      {
        code: 423,
        message: "Locked",
        description: "The resource that is being accessed is locked.",
      },
      {
        code: 424,
        message: "Failed Dependency",
        description:
          "The request failed due to a failure of a previous request.",
      },
      {
        code: 425,
        message: "Too Early",
        description: "The request cannot be fulfilled because it is too early.",
      },
      {
        code: 426,
        message: "Upgrade Required",
        description: "The client should switch to a different protocol.",
      },
      {
        code: 428,
        message: "Precondition Required",
        description:
          "The origin server requires the request to be conditional.",
      },
      {
        code: 429,
        message: "Too Many Requests",
        description:
          "The user has sent too many requests in a given amount of time.",
      },
      {
        code: 431,
        message: "Request Header Fields Too Large",
        description:
          "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.",
      },
      {
        code: 451,
        message: "Unavailable For Legal Reasons",
        description: "The resource requested is unavailable for legal reasons.",
      },
    ],
  },
  {
    title: "5xx Server Error",
    description: "The server failed to fulfill a valid request.",
    codes: [
      {
        code: 500,
        message: "Internal Server Error",
        description:
          "The server has encountered a situation it doesn't know how to handle.",
      },
      {
        code: 501,
        message: "Not Implemented",
        description:
          "The request method is not supported by the server and cannot be handled.",
      },
      {
        code: 502,
        message: "Bad Gateway",
        description:
          "The server received an invalid response from the upstream server.",
      },
      {
        code: 503,
        message: "Service Unavailable",
        description: "The server is currently unavailable.",
      },
      {
        code: 504,
        message: "Gateway Timeout",
        description:
          "The server did not receive a timely response from the upstream server.",
      },
      {
        code: 505,
        message: "HTTP Version Not Supported",
        description: "The server does not support the HTTP protocol version.",
      },
      {
        code: 506,
        message: "Variant Also Negotiates",
        description:
          "Transparent content negotiation for the request results in a circular reference.",
      },
      {
        code: 507,
        message: "Insufficient Storage",
        description:
          "The server is unable to store the representation needed to complete the request.",
      },
      {
        code: 508,
        message: "Loop Detected",
        description:
          "The server detected an infinite loop while processing the request.",
      },
      {
        code: 510,
        message: "Not Extended",
        description:
          "Further extensions to the request are required for the server to fulfill it.",
      },
      {
        code: 511,
        message: "Network Authentication Required",
        description: "The client needs to authenticate to gain network access.",
      },
    ],
  },
];

export default HTTP_STATUS_CODES;
