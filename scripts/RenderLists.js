import CDN          from "./@CDN.js";

const ImageDatas        = await CDN.AllGalleries();
const Parent            = document.querySelector("div#content div#container");
const List_Content      = document.querySelector("div#content").dataset.content;


const Lists = [
    ...new Set(
        Group_Tags(ImageDatas.map(data => data.tags).flat())
            .find(tag => tag.category === List_Content)
            .tags
    ).values()
];


Lists
    .sort((a,b) => {
        return artworks(b) - artworks(a);

        function artworks (Query)
        {
            return ImageDatas.filter(data => data.tags.some(({ tag }) => tag === Query)).length;
        }
    })
    .forEach(Query => {
        const All_Artworks = ImageDatas
            .filter(
                data => data.tags.some(({ tag }) => tag === Query)
            );

        const Artworks = shuffle(All_Artworks).filter((_, i) => i <= 2);

        Parent.innerHTML += `
                <div class="artist" id="${Query}">
                    <div id="left">
                        <h1 onclick="document.location.href='./search.html?tag=${Query}'" class="clickable">${Query}</h1>
                        
                        <div class="clickable go-to-galleries" onclick="document.location.href='./search.html?tag=${Query}'">
                            <h1>View <span class="artworks-amount">${All_Artworks.length}</span> galleries</h1>
                        </div>
                    </div>

                    <div id="right">
                        <div class="artworks">
                            ${
                                Artworks
                                    .map((artwork) => {
                                        return `
                                            <img
                                                loading="lazy"
                                                class="clickable"
                                                src="${CDN.ImageURL(artwork, 1)}"
                                                onclick="document.location.href='./doujin.html?d=${artwork.id}'"
                                            >
                                        `
                                    })
                                    .join("\n")
                            }
                        </div>
                    </div>
                </div>
        `
    });


function Go_To_Doujin (id)
{
    document.location.href = `./doujin?d=${id}`
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function Image_Extension (page, gallery_data)
{
    return gallery_data.special_formats
        .find(({ page:current_page }) => current_page === (page))?.format || "jpg";
}

function Group_Tags (Tags)
{
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