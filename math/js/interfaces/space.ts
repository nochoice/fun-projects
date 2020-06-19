export interface Space {
    items: SpaceItem[];
    properties: SpaceProperties;
    spaces?: Space[];
    modificators?: any;
}

export interface SpaceProperties {
    startPoint: number[];
    gage: number;
}

export interface SpaceItem {
    vector: number[],
    startPoint?: number[],
    decorators?: any[],
    modifiers?: any[]
}

export interface SpaceState {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    spaces: Space[];
} 