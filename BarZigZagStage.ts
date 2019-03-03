const w : number = window.innerWidth
const h : number = window.innerHeight
const nodes : number = 5
const bars : number = 2
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const scGap : number = 0.05
const scDiv : number = 0.51
const foreColor : string = "#673AB7"
const backColor : string = "#212121"

const maxScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.max(0, scale - i / n)
}

const divideScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.min(1 / n, maxScale(scale, i, n)) * n
}

const scaleFactor : Function = (scale : number) : number => Math.floor(scale / scDiv)

const mirrorValue : Function = (scale : number, a : number, b : number) : number => {
    const k : number = scaleFactor(scale)
    return (1 - k) / a + k / b
}

const updateValue : Function = (scale : number, dir : number, a : number, b : number) : number => {
    return mirrorValue(scale, a, b) * dir * scGap
}


const drawBZZNode : Function = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const gap : number = h / (nodes + 1)
    const size : number = gap / sizeFactor
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    const hGap : number = (2 * size) / (bars + 1)
    context.save()
    context.translate(w / 2, gap * (i + 1))
    context.rotate(Math.PI/2 * sc2)
    context.fillStyle = foreColor
    context.fillRect(-size, -hGap, size, hGap)
    context.translate(0, -size)
    for (var j = 0; j < bars; j++) {
        const sc : number = divideScale(sc1, j, bars)
        context.save()
        context.translate(size * (1 - 2 * j) * sc, -hGap + j * 2 * hGap)
        context.fillRect(0, 0, size, hGap)
        context.restore()
    }
    context.restore()
}
