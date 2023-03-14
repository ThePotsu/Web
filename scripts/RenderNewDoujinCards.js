import CDN          from "./@CDN.js";

const ImageDatas        = await CDN.AllGalleries();
const Parent            = document.querySelector("div#new-doujins-cards-ctn");
const NewDoujins        = ImageDatas.filter(d => d.new);


const RenderDoujins = () => {
    return NewDoujins
        .filter((_,i) => i <= 9)
        .map(doujin => {
            return `
                <div class="doujin-card" id="${doujin.id}">
                    <div class="images">
                        ${
                            new Array(Math.min(3 || doujin.pages))
                                .fill(1)
                                .map((undefined, i) => {
                                    return `<img src="${CDN.ImageURL(doujin, i + 1)}">`
                                })
                                .join("\n")
                        }
                    </div>
                    <div class="data">
                        <span id="title">${doujin.title.substring(0, 130)}${doujin.title.length > 30 ? "..." : ""}</span>
                        <div id="flex">
                            <span id="artist">${doujin.tags.find(t => t.category === "artist")?.tag || "unknown"}</span>
                            <span id="pages">${doujin.pages} pages</span>
                        </div>
                    </div>
                </div>P
            `
        })
        .join("");
}

if (NewDoujins[0]) {
    Parent.innerHTML = `
        <div id="cards-content">
            ${RenderDoujins()}
        </div>
        <div id="pages">
            ${
                new Array(Math.min(10, NewDoujins.length))
                    .fill(1)
                    .map((_, i) => `<div class=\"dot ${i === 0 ? "current" : ""}\"></div>`)
                    .join("\n")
            }
        </div>
        <div class="clickable" id="link-ctn" onclick="window.location.href='./new.html'">
            <span>View ${NewDoujins.length} newly released doujins</span>
            <div class="inject-svg" id="arrow-right">
        </div>
    `;


    let page  = 0;
    let pages = Math.min(10, NewDoujins.length);

    const ScrollBy = document.querySelector("div#cards-content").getBoundingClientRect().width;

    setInterval(() => {
        if ((page + 1) === pages) {
            page = 0
        } else {
            page++;
        }

        document.querySelector("div#new-doujins-cards-ctn div#cards-content").scrollTo({
            left: (ScrollBy + 7) * page
        });

        document.querySelector("div.dot.current")?.classList.remove("current");
        document.querySelector(`div.dot:nth-child(${page + 1})`)?.classList.add("current");
    }, 5000);
}


function Image_Extension (page, gallery_data)
{
    return gallery_data.special_formats
        .find(({ page:current_page }) => current_page === (page))?.format || "jpg";
}