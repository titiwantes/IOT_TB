import coap, { IncomingMessage } from "coap";

export function sendRequestCoAP(hostname: string | undefined, path: string, payload: any): Promise<any> {
  var req = coap.request({
    observe: false,
    hostname: hostname,
    pathname: path,
    method: 'POST',
    confirmable: true,
    options: {
      "Content-Format": 'application/json'
    }

  })

  req.write(JSON.stringify(payload));

  let promise = new Promise((resolve) => {
    req.on('response', function (res: IncomingMessage) {
      let toReturn: any = {}
      // console.log('response code', res.code);
      // res.pipe(process.stdout)
      if (res.code === "4.00") {
        toReturn.state = 'KO'
        toReturn.message = res.code + ": Bad Request - Invalid URL, request parameters or body"
      } else if (res.code === "4.01") {
        toReturn.state = 'KO'
        toReturn.message = res.code + ": Unauthorized - Invalid $ACCESS_TOKEN"
      } else if (res.code === "4.04") {
        toReturn.state = 'KO'
        toReturn.message = res.code + ": Not Found - Resource not found"
      } else if (res.code === "2.01" || res.code === "2.00") {
        toReturn.state = 'OK'
        toReturn.message = res.code + ": Succeful send"
      } else {
        toReturn.state = 'KO'
        toReturn.message = res.code
      }

      resolve(toReturn)
    });
  })
  req.end();

  return promise
}