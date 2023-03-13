$(window).scroll(function () { 
    //You've scrolled this much:
    if (CurrentInView) {
        const Page = Number(Array.from(document.getElementsByClassName("doujin-image")).find(e => e.getBoundingClientRect().y > 1)?.id?.slice("img_".length));

        if (!Page) return;

        window.localStorage.setItem(`last-read-${CurrentInView}`, JSON.stringify({ 
            page: Page, 
            y: $(window).scrollTop()
        }));
    }
});