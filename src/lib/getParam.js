import history from "@/router/history";
export default (key) => {
    let value = '';
    if (history.location.search) {
        console.log(history.location.search)
        let newArr = [];
        let arr = history.location.search.substr(1).split('&');
        arr.forEach(item => {
            newArr.push(...item.split('='))
        })
        let index = newArr.indexOf(key);
        value = newArr[index + 1];
        console.log(newArr)
    }
    let obj = {
        'page': value || 1,
        'keyword': (value) || ''
    }
    value = obj[key];
    return value;
}