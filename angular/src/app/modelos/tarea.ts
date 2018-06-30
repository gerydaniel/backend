export class Tarea {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public status: string,
        public createAt,
        public updateAt
    ) { }
}
