import libraries    from "../../Data/Library.json" assert { type: "json" };
import CDN          from "./@CDN.js";

const ImageDatas        = await CDN.AllGalleries();
const Parent            = document.querySelector("div#library-ctn");

for (const library of libraries) {
    Parent.innerHTML += `
        <div class="library">
            <div class="top">
                <h1
                    class="clickable"
                    id="library-series"
                    onclick="null;document.location='./view.html?v=${Doujins(library).map(d => d.id).join(",")}'"
                >${library.series}</h1>

                <h1 id="data">${
                    Group_Languages(library)
                        .map(lang => `${lang.percentage}% ${lang.language}`)
                        .join(" • ")
                }</h1>
            </div>

            <div class="bot">
                ${
                    Doujins(library)
                        .map(doujin => `<img
                            src="${CDN.ImageURL(doujin, 1)}"
                            onclick="null;document.location='./doujin.html?d=${doujin.id}'"
                        >`)
                        .join("\n")
                }
            </div>

            <a
                class="clickable doujin-info"
                id="library-series"
                href="./library.html?s=${library.series}"
            >View library</a>
        </div>
    `
}

function Doujins (library, testing)
{
    const Filtered = ImageDatas.filter(data => library.doujins.includes(data.id));

    return Filtered.sort(function(a, b){
        return library.doujins.findIndex(dou_id => dou_id === a.id) - library.doujins.findIndex(dou_id => dou_id === b.id);
    });
}

function Group_Languages (library) {
    const langs     = [];
    const doujins   = Doujins(library);

    for (const doujin of doujins) {
        const Doujin_Language = doujin.tags.find(tag => tag.category === "language")?.tag || "english";

        let Existing_Data = langs.find(lang => lang.language === Doujin_Language);

        if (Existing_Data) {
            Existing_Data.doujins++;
        } else {
            langs.push({ language: Doujin_Language, doujins: 1 });
        }
    }

    return langs.map(language => {
        return {
            ...language,
            percentage: Percentage(language.doujins, doujins.length)
        }
    })
}

function Percentage (current, max) {
    return Math.round((current / max) * 100);
}