const BaseURL = "https://github.com/ThePotsu";

export default {
    ImageURL: function (GalleryData, page) {
        console.log(GalleryData)
        return `${BaseURL}/CDN-${GalleryData.CDN}/${GalleryData.id}/${page}.${GalleryData.special_formats.find(f => f.page === page)?.format || "jpg"}`;
    },

    AllGalleries: async function () {
        console.log("loading");
        console.log(await this.__LoadJSON("CDN-1"));

        const Galleries = [];
        for (let CDN = 1 ; CDN < ((await this.CDNs()).CDNS + 1) ; CDN++) {
            Galleries.push(...((await this.CDN(CDN)).galleries));
        }

        return Galleries;
    },

    CDNs: async function () {
        return await this.__LoadJSON("HQ");
    },

    CDN: async function (CDN) {
        return await this.__LoadJSON(`CDN-${CDN}`);
    },

    __LoadJSON: async function (CDN) {
        return (await fetch(`../data/${CDN}-catalogue.json`, { method: "GET", headers: { Accept: "application/json" } })).json();
    }
}