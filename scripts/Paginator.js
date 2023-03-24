const params    = new URLSearchParams(window.location.search);

const DoujinsPerPage = 20;
const RawPage   = Number(params.get("page")) || 1;

export default async function FilterImageDatas (ImageDatas) {
    const Pages     = Math.ceil(ImageDatas.length / DoujinsPerPage);
    const Page      = 
    RawPage <= 0 ? 
        1 
        : 
        RawPage >= Pages ? 
            Pages
            :
            RawPage;

            
    const ImageDatasToRender    = ImageDatas.filter((_, index) => (index >= ((RawPage - 1) * DoujinsPerPage)) && (index < (RawPage * DoujinsPerPage)));


    const PageBtnCtn = document.querySelector("div#page-buttons-ctn");
    if (PageBtnCtn) {
        PageBtnCtn.innerHTML = 
            `
            <a class="page-btn-rdr ${Page === 1 ? "disabled" : ""}" id="prev-page-btn-rdr" href="${GenURL(Page - 1)}"><<</a>
            ${
                new Array(Pages)
                    .fill(1)
                    .map((_, index) => {
                        return `<a class="page-btn-rdr" href="${GenURL(index + 1)}">${index + 1}</a>`
                    })
                    .join("")
            }
            <a class="page-btn-rdr ${Page === Pages ? "disabled" : ""}" id="next-page-btn-rdr" href="${GenURL(Page + 1)}">>></a>
            `
    }

    
    return {
        data    : ImageDatasToRender,
        pages   : Pages,
        page    : Page
    }


    function GenURL (page)
    {
        return document.location.href.replace(/page=[0-9]+/, `page=${page}`);
    }
}