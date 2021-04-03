const URL = "../assets/test.json"

export const getJSON = () => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.open("GET", `${URL}`, true);
        request.setRequestHeader('Accept', '*/*');
        request.setRequestHeader('Content-type', 'application/json');
        request.withCredentials = true;

        request.onload = () => {
            if (request.status >= 200 && request.status < 300) {
                let data = JSON.parse(request.responseText);

                resolve(data);
            } else {
                reject(request.statusText);
            }
        };

        request.onerror = () => reject('An error occurred in the request');

        request.send();
    });
}