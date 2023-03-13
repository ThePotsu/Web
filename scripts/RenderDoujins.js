import RenderDoujin from "./RenderDoujin.js";
import CDN          from "./@CDN.js";

const ImageDatas        = await CDN.AllGalleries();
const Doujins_Container = document.querySelector("div#content #doujins");


ImageDatas.forEach((Data) => {
    RenderDoujin(Data, Doujins_Container);
});