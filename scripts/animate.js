
const animate_once = { once: true, };
function set_animating(evt) {
    const element = evt.currentTarget;
    if(element.classList.contains("animating")) return;
    element.classList.add("animating");
    element.addEventListener('animationend', () => element.classList.remove("animating"),animate_once);

}