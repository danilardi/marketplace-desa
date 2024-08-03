export class UpdateUserRequest {
    constructor(name, email, phonenumber, provinsi, kota, kecamatan, kelurahan, detailAddress) {
        this.fullname = name;
        this.email = email;
        this.phonenumber = phonenumber;
        this.address = [provinsi, kota, kecamatan, kelurahan, detailAddress];
    }
}