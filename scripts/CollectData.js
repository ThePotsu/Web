export default function Collect (doujin) {
    if (localStorage.getItem("data-collected") === null) {
        localStorage.setItem("data-collected", JSON.stringify([
            {
                
            }
        ]))
    }
    const CurrentTime = new Date().getHour();
}