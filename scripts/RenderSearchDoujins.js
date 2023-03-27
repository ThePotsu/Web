import IncludeFilterBtns    from "./IncludeFilterButtons.js";
import RenderDoujin         from "./RenderDoujin.js";
import CDN                  from "./@CDN.js";
import Paginator            from "./Paginator.js";

const ImageDatas            = await CDN.AllGalleries();

IncludeFilterBtns();



const params    = new URLSearchParams(window.location.search);
const q_query   = params.get("query") || "";
const q_tags    = (params.get("tag")?.split(",").filter(string => string.length >= 1) || []);
const q_rating  = params.get("rating") || 0;
const q_pages   = params.get("pages") || 0;
const q_sortby  = params.get("sortby") || "r1";

const All_Tags = ImageDatas
    .map(Data => Data.tags)
    .flat();

console.log(JSON.stringify(All_Tags, null, 2), All_Tags.filter(d => !d.tags))
const matches = [];

All_Tags
    .forEach(
        ({tag}) => {
                return (
                    (new RegExp(`\b^${tag}$\b`, "i").test(q_query))
                    ||
                    (q_query.split(/ +/g).some(
                        q => {
                            let matched = (tag.toLowerCase().includes(q)) && (tag.length >= q.length);

                            if (matched) {
                                let current = matches.find(d => d.id === q);

                                if (!current) {
                                    matches.push({ id: q, res: [ tag ] })
                                } else {
                                    current.res.push(tag)
                                }
                                return true
                            } else return false;
                        }
                    ))
                )
            }
    );

const Tags_In_Query     = [
    ...new Set(
            matches
            .map(match => {
                const { id, res } = match;
    
                return (
                    res.find(r => r.toLowerCase() === id.toLowerCase())
                    ||
                    res
                )
            })
            .flat()
    ).values()
];

const Doujins_Container = document.querySelector("div#content #doujins");
const Directories       = ImageDatas.reverse();
const Filtered_Directories = Directories
    .filter(data => {
        return (
            ( q_query === "" ? 
                false 
                : 
                data.title.toLowerCase().includes(q_query.toLowerCase().trim()) 
            ) // Search for titles
                ||
            (
                ( q_tags.length === 0 ? 
                    false 
                    : 
                    q_tags.some(t => data.tags.some(q => q.tag.includes(t) )) // Search for tags
                )
                    ||
                ( Tags_In_Query.length === 0 ? 
                    false 
                    : 
                    Tags_In_Query.every(t => data.tags.some(q => q.tag.includes(t) )) // Search for tags that are specified in query
                )
            )
        )
    })
    .sort((a,b) => {
        if (a.title.toLowerCase().includes(q_query.toLowerCase())) return -1;
        return 1;
    })

(await Paginator(Filtered_Directories)).forEach((Directory) => {
    RenderDoujin(Directory, Doujins_Container);
});

document.querySelector("h1#search-result-amount").innerHTML = `${Filtered_Directories.length} results`