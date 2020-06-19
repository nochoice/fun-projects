export const createCanvas = (width: number, height: number): any => {
    const elem = document.createElement('canvas');

    elem.width = width;
    elem.height = height;

    return elem;
}

export const appendCanvas = (place: any, canvas: HTMLCanvasElement) => {
    place.appendChild(canvas);
}

export const getCtx = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => canvas.getContext('2d');