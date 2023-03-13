import RenderDoujin         from "./RenderDoujin.js";
import IncludeFilterBtns    from "./IncludeFilterButtons.js";
import CDN                  from "./@CDN.js";

const ImageDatas            = await CDN.AllGalleries();


IncludeFilterBtns();


const Doujins_Container = document.querySelector("div#content #doujins");
ImageDatas.filter(d => d.new).forEach((Data) => {
    RenderDoujin(Data, Doujins_Container);
});