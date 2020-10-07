const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        body: data
    });

    return await res.text();
};

const getResource = async (url) => {        // получение данных с БД
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not tetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export { postData, getResource };