import CDN          from "./@CDN.js";

export default function CreateDoujin (Data, Parent, ReturnString) {
    const Doujin_El     = document.createElement("a");
    const Directory     = Data.id;


    Doujin_El.classList.add("doujin");


    Doujin_El.id        = Directory;
    Doujin_El.href      = `./doujin.html?d=${Directory}`;
    Doujin_El.innerHTML =
        `
        <div id="container">
            <img loading="lazy" src="${CDN.ImageURL(Data, 1)}" class="doujin-image">
            <img loading="lazy" src="${CDN.ImageURL(Data, 1)}" class="doujin-image-preview">

            <div id="content">
                <div id="top">
                    <div class="doujin-title">${BreakTitle(Data.title)}</div>

                    ${
                        localStorage.getItem(`last-read-${Directory}`) ?
                            `<h1 id="last-read">Continue reading at page ${JSON.parse(localStorage.getItem(`last-read-${Directory}`)).page}</h1>`
                            :
                            ""
                    }

                    <div id="doujin-data">
                        <div class="doujin-language">
                            <h1 class="doujin-language">${Data.tags.find(t => t.category === "language")?.tag || "english"}</h1>
                        </div>
                        <h1 class="doujin-pages">${Data.pages}</h1>
                        <h1 class="doujin-category">${Data.category}</h1>
                    </div>
                </div>

                <div id="bot">
                    <div id="tags-ctn">
                        ${
                            Group_Tags(Data.tags)
                                .map((tag, i) => {
                                    const { category:Tag_Category, tags:Tags } = tag;

                                    return (
                                        `
                                            <div class="${i === 0 ? "tag-1" : ""} tag-content" id="${Tag_Category}">
                                                <h1 class="tag-category">${Tag_Category}</h1>

                                                <div class="inner-tags-ctn">
                                                    ${
                                                        Tags
                                                            .filter((_, i) => i <= 10)
                                                            .map(Tag_Value => `<h1 class="tag-content">${Tag_Value}</h1>`)
                                                            .join("\n")
                                                    }
                                                </div>
                                            </div>
                                        `
                                    )
                                })
                                .join("\n")
                        }
                    </div>
                </div>
            </div>
        </div>
        `

    if (ReturnString) {
        return Doujin_El.outerHTML;
    }

    if (Parent) {
        document.body.appendChild(Doujin_El);
        Parent.appendChild(Doujin_El);
    }


    function Group_Tags (Tags) {
        const Grouped_Tags = [];

        for (const Tag of Tags) {
            const { category, tag } = Tag;

            if (!Grouped_Tags.find(tag => tag.category === category)) {
                Grouped_Tags.push({
                    category,
                    tags: [ tag ]
                });
            } else {
                Grouped_Tags.find(t => t.category === category).tags.push(tag)
            }
        }

        return Grouped_Tags
            .sort((a,b) => {
                return b.tags.length - a.tags.length
            })
    }
}

function Image_Extension (page, gallery_data)
{
    return gallery_data.special_formats
        .find(({ page:current_page }) => current_page === (page))?.format || "jpg";
}

function HighlightTitle (title)
{
    const Render = (title) => `<span class="de-highlight">${title}</span>`;

    return title
        .replace(/\[[a-zA-Z0-9 ^\]]+\]/g, Render)
        .replace(/\{[a-zA-Z0-9 ^\}]+\}/g, Render)
        .replace(/\([a-zA-Z0-9 ^\)]+\)/g, Render)
}

function BreakTitle (title) {
    return `
        <h1 class="title-start">${HighlightTitle(title.substring(0, 29))}</h1>
        <h1 class="title-end">${HighlightTitle(title.substring(30, title.length))}</h1>
    `
}