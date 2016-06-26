
export default class Fetch {
    static get (url) {
        return Fetch.connect(url)
    }

    static post(url, data) {
        return Fetch.connect(
                url,
                {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            )
    }

    static connect (url, body) {
        return fetch(url, body)
            .then(
                response => response.json(),
                () => {
                    alert('网络连接错误，请重试！');
            })
            .then(res => {
                console.log('res:' + JSON.stringify(res));
                if (res.error && res.error.code === 1003) {
                    alert(res.error.text);
                    location.href = '/';
                }
                return res;
            })
    }
}
