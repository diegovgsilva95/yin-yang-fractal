var canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    H = canvas.height = 720,
    W = canvas.width = 16*H/9,
    CX = W/2,
    CY = H/2,
    R = (Math.min(CX,CY)) * 0.95
    
var drawYinYang = function(cx, cy, r){

    let hr = r/2

    ctx.strokeStyle = "#0ff"
    ctx.fillStyle = "rgba(255,255,255,0.5)"
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy - hr, hr, 5 * Math.PI / 2, 3 * Math.PI / 2, true)
    ctx.arc(cx, cy, r, 3 * Math.PI / 2, 5 * Math.PI / 2, true)
    ctx.arc(cx, cy + hr, hr, 1 * Math.PI / 2, 3*Math.PI / 2)
    ctx.fill()
    
    ctx.strokeStyle = "#f00"
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy + hr, hr, 3 * Math.PI / 2, 5 * Math.PI / 2, true)
    ctx.arc(cx, cy, r, 5*Math.PI / 2, 3 * Math.PI / 2, true)
    ctx.arc(cx, cy - hr, hr, 3 * Math.PI / 2, 1 * Math.PI / 2)
    ctx.fill()
}
var recursiveDrawYinYang = async function(CX, CY, R, max = 4, iter = 0){
    drawYinYang(CX, CY, R)
    if(iter >= max) return;
    await Promise.all([
        recursiveDrawYinYang(CX, CY + R / 2, R / 5, max, iter + 1),
        recursiveDrawYinYang(CX, CY - R / 2, R / 5, max, iter + 1)
    ])
}
var draw = async function(){
    ctx.fillStyle = "#222"
    ctx.fillRect(0,0,W,H)
    await recursiveDrawYinYang(CX, CY, R)
}

requestAnimationFrame(draw)
