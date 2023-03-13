document.querySelectorAll("button.close-btn").forEach(e => {
    e.addEventListener("click", event => {
        document.getElementById("view").classList.add("hidden");
        document.querySelector("div.image_dirs.main").classList.remove("hidden");
        document.getElementById("resultamount").classList.remove("hidden");
    });
});

document.getElementById("inc-size").addEventListener("click", event => {
    CurrentMaxWidth = Math.min(100, CurrentMaxWidth + 10);

    localStorage.setItem("CurrentMaxWidth", CurrentMaxWidth.toString());

    Array.from(document.getElementsByClassName("image")).forEach(el => {
        el.style.width = `${CurrentMaxWidth}%`
    })
});

document.getElementById("dec-size").addEventListener("click", event => {
    CurrentMaxWidth = Math.max(10, CurrentMaxWidth - 10);

    localStorage.setItem("CurrentMaxWidth", CurrentMaxWidth.toString());

    Array.from(document.getElementsByClassName("image")).forEach(el => {
        el.style.width = `${CurrentMaxWidth}%`
    })
});