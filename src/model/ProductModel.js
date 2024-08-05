export class AddProductRequest {
    constructor(name, price, description, images) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.images = images;
    }
}