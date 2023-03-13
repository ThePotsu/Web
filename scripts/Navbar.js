const Navbar = document.querySelector("div#navbar");

let OpenedNavbar = false;

const params                        = new URLSearchParams(window.location.search);
const Search_Input_Default_Value    = params.get("query") || "";
const Query_Tags                    = (params.get("tag") || "")
    .split(",")
    .filter(t => t.length >= 1)
    .map((tag, i) => {
        return `
            <div class="search-tag-btn-ctn" id="tag-${i + 1}">
                <button class="remove-tag-btn">
                    <img src="./Web/content/icon/cancel.svg">
                </button>
                <h1>${tag}</h1>
            </div>
        `
    })
    .join("\n");

const Query_Pages       = params.get("pages") || 0;
const Query_SortBy      = params.get("sortby") || "r1";


const DynamicButtons = [
    function ()
    {
        const Viewing_Gallery   = params.get("v");

        return {
            if      : (Viewing_Gallery !== null) && (Number(Viewing_Gallery) !== NaN),
            return  :
                `<a class="link icon-btn-container" href="./doujin.html?d=${Viewing_Gallery}">
                    <div class="inject-svg" id="back"></div>
                    <h1 class="icon-btn-label">Back to gallery</h1>
                </a>`
        }
    },

    function ()
    {
        const Query = params.get("query") || "";

        return {
            if      : (Query?.length >= 1) || (Query_Tags.length >= 1),
            return  :
                `<a class="link icon-btn-container" href="./advanced.html?fill_q=${Query}&fill_t=${params.getAll("tag").join(",")}">
                    <div class="inject-svg" id="back"></div>
                    <h1 class="icon-btn-label">Edit Search</h1>
                </a>`
        }
    }
]


const RenderDynamicButtons = () => {
    return DynamicButtons
        .filter(btn => {
            return Boolean(btn().if) === true
        })
        .map(btn => {
            const data = btn().return;

            return data;
        })
        .join("\n");
}

const RenderContent = () => {
    return `
        <div id="links-ctn">
            <a class="link icon-btn-container" href="./new.html">
                <div class="inject-svg fill" id="new"></div>
                <h1 class="icon-btn-label">New</h1>
            </a>
            <a class="link icon-btn-container" href="./index.html">
                <div class="inject-svg" id="home;home"></div>
                <h1 class="icon-btn-label">Home</h1>
            </a>
            <a class="link icon-btn-container" href="./advanced.html">
                <div class="inject-svg fill" id="search"></div>
                <h1 class="icon-btn-label">Advanced</h1>
            </a>
            <a class="link icon-btn-container" href="./artists.html">
                <div class="inject-svg fill" id="artist"></div>
                <h1 class="icon-btn-label">Artists</h1>
            </a>
            <a class="link icon-btn-container" href="./libraries.html">
                <div class="inject-svg" id="doujin"></div>
                <h1 class="icon-btn-label">Libraries</h1>
            </a>
            <a class="link icon-btn-container" href="./characters.html">
                <div class="inject-svg" id="user"></div>
                <h1 class="icon-btn-label">Characters</h1>
            </a>
            <a class="link icon-btn-container" href="./parodies.html">
                <div class="inject-svg" id="parody"></div>
                <h1 class="icon-btn-label">Parody</h1>
            </a>
            <a class="link icon-btn-container" href="./tags.html">
                <div class="inject-svg" id="tag"></div>
                <h1 class="icon-btn-label">Tags</h1>
            </a>
            <a class="link icon-btn-container" href="./history.html">
                <div class="inject-svg" id="history"></div>
                <h1 class="icon-btn-label">History</h1>
            </a>
            ${RenderDynamicButtons()}
        </div>
    `
}

Navbar.innerHTML =
`
    <div class="always-in-view">
        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
        <svg id="3-lines" class="nav-button clickable" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18M3 6H21M9 18H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <div class="searchbar-ctn">
            <div class="searchbar">
                <input type="text" id="searchbar" value="${Search_Input_Default_Value}">
                <button id="search-btn">
                    <img src="./Web/content/icon/search.svg">
                </button>
            </div>

            <div id="tags-ctn">
                ${Query_Tags}
            </div>
        </div>
    </div>

    <div class="nav-content">
        <div id="nav-content" class="loading-content">${RenderContent()}</div>
    </div>
`


document.querySelector("button#search-btn").addEventListener("click", Search);
document.querySelector("input#searchbar").addEventListener("keypress", event => {
    if (event.code === "Enter" || event.code === "") {
        Search();
    }
});

document.querySelectorAll("button.remove-tag-btn").forEach((element, i) => {
    element.addEventListener("click", event => {
        document.querySelector(`div.search-tag-btn-ctn#tag-${i + 1}`).remove();
    });
});

document.querySelector("svg.nav-button").addEventListener("click", () => {
    document.querySelector("div#navbar div#nav-content")?.classList?.remove("loading-content");

    OpenedNavbar = !OpenedNavbar;

    if (!OpenedNavbar) {
        CloseNav();
    } else {
        OpenNav();
    }
})

document.addEventListener("click", (event) => {
    if (
        document.querySelector("div#nav-content")?.contains(event.target)
            ||
        document.querySelector("svg.nav-button")?.contains(event.target)
    ) return;

    if (OpenedNavbar) {
        CloseNav();
    }
})

document.onloadeddata = function () {
    document.querySelector("div#navbar div#nav-content")?.classList?.remove("loading-content");

    document.querySelector("div#navbar div#nav-content").classList.add("close-nav");
    document.querySelector("div#navbar div#nav-content").classList.remove("open-nav");

    document.querySelector("div#navbar").classList.add("close");
    document.querySelector("div#navbar").classList.remove("open");
}

function CloseNav () {
    document.querySelector("div#navbar div#nav-content").classList.add("close-nav");
    document.querySelector("div#navbar div#nav-content").classList.remove("open-nav");

    document.querySelector("div#navbar").classList.add("close");
    document.querySelector("div#navbar").classList.remove("open");

    document.body.style.overflowY = "scroll";
}

function OpenNav () {
    document.querySelector("div#navbar div#nav-content").classList.add("open-nav");
    document.querySelector("div#navbar div#nav-content").classList.remove("close-nav");
    
    document.querySelector("div#navbar").classList.add("open");
    document.querySelector("div#navbar").classList.remove("close");

    document.body.style.overflowY = "hidden";
}

function Search () {
    const query = document.querySelector("input#searchbar").value;
    const tags  = Array.from(document.querySelectorAll("div.search-tag-btn-ctn h1"))
        .map(tag_el => tag_el.innerHTML)
        .join(",");

    document.location = `./search.html?query=${query}&tag=${tags}&pages=${Query_Pages}&sortby=${Query_SortBy}`
}