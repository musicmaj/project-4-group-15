function init() {
    fetch('/api')
        .then((response) => response.json())
        .then((json) => console.log(json));
}

init();