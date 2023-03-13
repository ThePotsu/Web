if (localStorage.getItem(`last-read-${dir}`)) {
    image_el.onload = function () {
        if (CurrentMaxWidth !== 0) {
                image_el.style.width = `${CurrentMaxWidth}%`
        }
        
        ScrollToLastRead(MaxImage, dir)
    }
}

function ScrollToLastRead (required, dir) {
    Completed++
    
    if (Completed === 1) {
        const scrollToBtn = document.createElement("button");

        scrollToBtn.id = "scroll-to-btn";
        scrollToBtn.classList.add("action");
        scrollToBtn.classList.add("scroll-btn-not-done");
        scrollToBtn.innerHTML = `Loading ${((Completed / required) * 100).toFixed(2)}% (${Completed}/${required})`;
        
        document.body.appendChild(scrollToBtn);
        document.getElementById("up").appendChild(scrollToBtn);
    } else if (Completed !== required) {
        const scrollToBtn = document.getElementById("scroll-to-btn");

        scrollToBtn.innerHTML = `Loading ${((Completed / required) * 100).toFixed(2)}% (${Completed}/${required})`;
    }

    if (Completed === required) {
        const PageToScrollTo = Array.from(document.getElementsByClassName("image"))
            .filter(e => e.getBoundingClientRect().y > LastReadYCoordinate)
            .sort((a,b) => a.getBoundingClientRect().y - b.getBoundingClientRect().y)[0]
            ?.id
            .slice("img_".length);

        const scrollToBtn = document.getElementById("scroll-to-btn");
        scrollToBtn.innerHTML = `Scroll to Page ${PageToScrollTo}`;
        scrollToBtn.classList.remove("scroll-btn-not-done");

        scrollToBtn.addEventListener("click", event => {
            window.scrollTo({ top: LastReadYCoordinate })
        });
    }
}

function parseInt (string) {
    return Number(string.match(/[0-9]+/)?.[0]);
}