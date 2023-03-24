import RenderDoujin         from "./RenderDoujin.js";
import IncludeFilterBtns    from "./IncludeFilterButtons.js";
import CDN                  from "./@CDN.js";
import Paginator            from "./Paginator.js";

const ImageDatas            = await Paginator(await CDN.AllGalleries());


IncludeFilterBtns();


const Doujins_Container = document.querySelector("div#content #doujins");
ImageDatas.filter(d => d.new).forEach((Data) => {
    RenderDoujin(Data, Doujins_Container);
});