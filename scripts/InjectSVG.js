document.querySelectorAll("div.inject-svg").forEach(element => {
    const Parent = element.parentElement;

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", `./Web/content/icon/${element.id.split(";")[0]}.svg`, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;

                allText = allText.split("<!-- Code injected by live-server -->")[0];
                
                const SVGElement = new DOMParser().parseFromString(allText, "text/xml").querySelector("svg");

                Parent.replaceChild(SVGElement, element);

                element.classList.forEach(c => {
                    if (c !== "inject-svg") {
                        SVGElement.classList.add(c);
                    }
                });

                if (element.id.split(";")[1]) {
                    SVGElement.id = element.id.split(";")[1];
                }

                if (element.dataset?.event) {
                    const event = new Event(element.dataset.event);

                    document.dispatchEvent(event);
                }
            }
        }
    }
    rawFile.send(null);
})