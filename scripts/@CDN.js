const BaseURL = "https://github.com/ThePotsu";

export default {
    ImageURL: function (GalleryData, page) {
        return `${BaseURL}/CDN-${GalleryData.CDN}/${GalleryData.id}/${page}.${GalleryData.special_formats.find(f => f.page === page)?.format || "jpg"}`;
    },

    AllGalleries: async function () {
        const Galleries = [];

        for (let CDN = 1 ; CDN < ((await this.CDNs()).CDNS + 1) ; CDN++) {
            Galleries.push(...((await this.CDN(CDN)).galleries));
        }

        return Galleries;
    },

    CDNs: async function () {
        return await this.__LoadJSON(`${BaseURL}/CDN-${HQ}`);
    },

    CDN: async function (CDN) {
        return await this.__LoadJSON(`${BaseURL}/CDN-${CDN}`);
    },

    __LoadJSON: async function (url) {
        return new Promise(resolve => {
            $.ajax({
                dataType: "json",
                url: url,
                data: "",
                success: json => resolve(json)
            });
        })
    }
}