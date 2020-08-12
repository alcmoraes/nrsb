function headers(data?: any | string, jsonContent = false): Headers {
  const otp = new Headers();
  if (data) {
    if (data.constructor === String) data = { Authorization: `Bearer ${data}` };

    for (const i in data) {
      otp.set(i, (data as any)[i]);
    }
  }
  if (jsonContent) otp.set('Content-Type', 'application/json');
  return otp;
}

function isJsonResponse(response: any) {
  // @todo
  const contentType = response.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') !== -1;
}

async function validateStatusCode(response: any) {
  // @todo
  if (!response.ok) {
    const error = new Error(`Request to ${response.url} failed with status code: ${response.status}`);
    if (isJsonResponse(response)) {
      const errorJson = await response.json();
      if (Object.prototype.hasOwnProperty.call(errorJson, 'message')) {
        const { message } = errorJson;
        error.message = message;
      }
    }
    throw error;
  }
  return response;
}

async function validateContentType(response: any) {
  // @todo
  const contentType = response.headers.get('content-type');
  if (!contentType || (contentType.indexOf('application/json') === -1 && contentType.indexOf('text/plain') === -1)) {
    throw new Error(`Invalid Content Type: ${response.status}`);
  }
  return response;
}

async function parseResponse(response: any) {
  // @todo
  if (isJsonResponse(response)) {
    return response.json();
  } else {
    return response.text();
  }
}

export function get(path: string, headersData?: any | string) {
  return fetch(`${path}`, {
    method: 'GET',
    headers: headers(headersData),
  })
    .then(validateStatusCode)
    .then(validateContentType)
    .then(parseResponse);
}

export function post(path: string, headersData?: any | string, data?: any) {
  return fetch(`${path}`, {
    method: 'POST',
    body: data ? JSON.stringify(data) : null,
    headers: headers(headersData, true),
  })
    .then(validateStatusCode)
    .then(validateContentType)
    .then(parseResponse);
}

export function put(path: string, headersData?: any | string, data?: any) {
  return fetch(`${path}`, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : null,
    headers: headers(headersData, true),
  })
    .then(validateStatusCode)
    .then(parseResponse);
}

export function del(path: string, headersData?: any | string) {
  return fetch(`${path}`, {
    method: 'DELETE',
    headers: headers(headersData),
  })
    .then(validateStatusCode)
    .then(() => true);
}
