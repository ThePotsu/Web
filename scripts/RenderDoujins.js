import RenderDoujin from "./RenderDoujin.js";
import CDN          from "./@CDN.js";
import Paginator    from "./Paginator.js";

const ImageDatas        = await CDN.AllGalleries();
const Doujins_Container = document.querySelector("div#content #doujins");

const ImageDatasToRender = await Paginator(ImageDatas);

ImageDatasToRender.forEach((Data) => {
    RenderDoujin(Data, Doujins_Container);
});