import history from "@/router/history";
export default () => {
    let page = 1;
    if (history.location.search) page = history.location.search.split('=')[1];
    return page;
}