import RenderDoujin from "./RenderDoujin.js";
import CDN          from "./@CDN.js";

const ImageDatas    = await CDN.AllGalleries();
const Filters       = [];
let SortBy;

export default function () {
    const Parent = document.querySelector("div#filter-btns");

    Parent.innerHTML = `
        <div class="default-filter-btn" id="filter-manga">
            <div class="inject-svg" id="filter"></div>
            <span>Manga</span>
        </div>

        <div class="default-filter-btn" id="filter-doujinshi">
            <div class="inject-svg" id="filter"></div>
            <span>Doujinshi</span>
        </div>

        <div class="default-filter-btn" id="filter-western">
            <div class="inject-svg" id="filter"></div>
            <span>Western</span>
        </div>

        <div class="default-filter-btn" id="filter-image-set">
            <div class="inject-svg" id="filter"></div>
            <span>Image Set</span>
        </div>

        <div class="default-filter-btn" id="filter-artist-cg">
            <div class="inject-svg" id="filter"></div>
            <span>Artist CG</span>
        </div>

        <div class="default-filter-btn" id="filter-game-cg">
            <div class="inject-svg" id="filter"></div>
            <span>Game CG</span>
        </div>

        <div class="default-filter-btn" id="filter-new">
            <div class="inject-svg" id="new"></div>
            <span>New</span>
        </div>

        <div class="default-filter-btn" id="sort-asc-page">
            <div class="inject-svg" id="sort-ascending"></div>
            <span>Pages</span>
        </div>

        <div class="default-filter-btn" id="sort-des-page">
            <div class="inject-svg" id="sort-descending"></div>
            <span>Pages</span>
        </div>

        <div class="default-filter-btn" id="action-random">
            <div class="inject-svg" id="random"></div>
            <span>Random</span>
        </div>

        <div class="default-filter-btn" id="action-view">
            <div class="inject-svg" id="doujin"></div>
            <span>View All</span>
        </div>
    `;


    document.querySelectorAll("div.default-filter-btn").forEach(element => {
        element.addEventListener("click", event => {
            console.log("clicked");

            const type  = element.id.split("-")[0];
            const value = element.id.slice(type.length + 1);

            const Filter = Array.from(document.querySelectorAll("a.doujin")).map(el => el.id);

            const Filtered_Doujins = ImageDatas
                .filter(doujin => {
                    return Filter.includes(doujin.id);
                });



            switch (type) {
                case "action": {
                    switch (value) {
                        case "view": {
                            return document.location.href = `./view.html?v=${Filtered_Doujins.map(d => d.id).join(",")}`;
                        } break;

                        case "random": {
                            return document.location.href = `./doujin.html?d=${Filtered_Doujins[Math.floor(Math.random() * Filtered_Doujins.length)].id}`;
                        } break;
                    }
                } break;

                case "filter": {
                    switch (value) {
                        case "manga": {
                            const Clicked = ExistingFilterValue(value) || false;

                            if (!Clicked) {
                                AddFilter(value, true, element, (doujin) => doujin.category === "manga");
                            } else {
                                RemoveFilter(value, element);
                            }
                        } break;

                        case "doujinshi": {
                            const Clicked = ExistingFilterValue(value) || false;

                            if (!Clicked) {
                                AddFilter(value, true, element, (doujin) => doujin.category === "doujinshi");
                            } else {
                                RemoveFilter(value, element);
                            }
                        } break;

                        case "western": {
                            const Clicked = ExistingFilterValue(value) || false;

                            if (!Clicked) {
                                AddFilter(value, true, element, (doujin) => doujin.category === "western");
                            } else {
                                RemoveFilter(value, element);
                            }
                        } break;

                        case "image-set": {
                            const Clicked = ExistingFilterValue(value) || false;

                            if (!Clicked) {
                                AddFilter(value, true, element, (doujin) => doujin.category === "image set");
                            } else {
                                RemoveFilter(value, element);
                            }
                        } break;

                        case "artist-cg": {
                            const Clicked = ExistingFilterValue(value) || false;

                            if (!Clicked) {
                                AddFilter(value, true, element, (doujin) => doujin.category === "artist cg");
                            } else {
                                RemoveFilter(value, element);
                            }
                        } break;

                        case "game-cg": {
                            const Clicked = ExistingFilterValue(value) || false;

                            if (!Clicked) {
                                AddFilter(value, true, element, (doujin) => doujin.category === "game cg");
                            } else {
                                RemoveFilter(value, element);
                            }
                        } break;

                        case "new": {
                            const Clicked = ExistingFilterValue(value) || false;

                            if (!Clicked) {
                                AddFilter(value, true, element, (doujin) => doujin.new);
                            } else {
                                RemoveFilter(value, element);
                            }
                        } break;
                    }
                } break;

                case "sort": {
                    switch (value) {
                        case "asc-page": {
                            SetSortBy(1);
                        } break;

                        case "des-page": {
                            SetSortBy(-1)
                        } break;
                    }
                } break;
            }

            SetDoujins(
                Filtered_Doujins
                    .filter(doujin => {
                        let MatchedFilters = 0;

                        Filters.forEach(Filter_Data => {
                            const FilterCallback = Filter_Data.callback;

                            if (FilterCallback(doujin)) {
                                MatchedFilters++;
                            }
                        });

                        return MatchedFilters === Filters.length;
                    })
                    .sort(SortBy)
                    .map(data => RenderDoujin(data, undefined, true))
                    .join("\n")
            );
        });
    });


    function RemoveFilter (id, element) {
        Filters.splice(Filters.findIndex(fil => fil.id === id), 1);
        element.classList.remove("clicked");
    }

    function AddFilter (id, value, element, callback) {
        Filters.push({ id, value, callback });

        if (element) {
            element.classList.add("clicked");
        }
    }

    function SetSortBy (by) {
        if (by === -1) {
            SortBy = (a,b) => b.pages - a.pages;
        } else {
            SortBy = (a,b) => a.pages - b.pages;
        }
    }

    function ExistingFilterValue (id) {
        return Filters.find(filter => filter.id === id)?.value;
    }

    function SetDoujins (InnerHTML) {
        const Doujins_Container = document.querySelector("div#doujins");
        Doujins_Container.innerHTML = InnerHTML;
    }
}