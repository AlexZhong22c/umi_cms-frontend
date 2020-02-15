const projectUrlPrefix = 'http://127.0.0.1:7009';

export default function (request) {
  if (!/^(http(|s):\/\/)|^\/\//.test(request.url))
    request.url = projectUrlPrefix + request.url;
  return request;
}