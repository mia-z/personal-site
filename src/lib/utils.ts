export const parallax = (event: MouseEvent, element: HTMLDivElement) => {
    let _w = window.innerWidth/2;
    let _h = window.innerHeight/2;
    let _mouseX = event.clientX;
    let _mouseY = event.clientY;
    let _depth1 = `${50 - (_mouseX - _w) * 0.001}% ${50 - (_mouseY - _h) * 0.002}%`;
    let _depth2 = `${50 - (_mouseX - _w) * 0.003}% ${50 - (_mouseY - _h) * 0.003}%`;
    let _depth3 = `${50 - (_mouseX - _w) * 0.001}% ${50 - (_mouseY - _h) * 0.001}%`;
    let x = `${_depth3}, ${_depth2}, ${_depth1}`;
    console.log(x);
    element.style.backgroundPosition = x;
}