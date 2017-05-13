import querystring from 'querystring';

interface FetchParams {
    [key: string]: any;
}

interface FetchHeaders {
    [key: string]: any;
}

interface FetchOptions {
    headers?: FetchHeaders;
    params?: FetchParams;
}

/**
 * Makes a fetch request if not yet cached.
 * Note: This function does not follow the Fetch API.
 *
 * @param {string} url - Request URL
 * @return {Promise} - A Promise that resolves to the response object, rejects on error
 */
export function fetch<T>(url: string, options?: FetchOptions): Promise<T> {
    return new Promise(
        (resolve: (val: T) => void, reject: (msg: string) => void) => {
            const xhr = new XMLHttpRequest();
            const qs = (options && options.params) ? `?${querystring.stringify(options.params)}` : '';

            xhr.open('GET', `${url}${qs}`, true);

            // set headers
            if (options && options.headers) {
                for (let header in options.headers) {
                    xhr.setRequestHeader(header, options.headers[header]);
                }
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const resp = JSON.parse(xhr.responseText);
                    if (xhr.status === 200) {
                        resolve(resp);
                    } else {
                        reject(resp);
                    }
                }
            };
            xhr.onerror = () => {
                const resp = JSON.parse(xhr.responseText);
                reject(resp);
            };
            xhr.send();
        }
    );
}

export function active(compare: boolean, className: string): string {
    if (compare) {
        return className;
    }
}

