import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState, useEffect } from "react";
import { getListKecamatan, getListKelurahan, getListKota, getListProvinsi } from "../../utils/API/Address";
import { capitalizeEachWord } from "../../utils/Helper";
import { getUser } from "../../utils/API/Auth";

export const CheckoutDataModal = ({ show, setShow, selectedCartItems, handler }) => {
    // pembatas
    const [data, setData] = useState({
        nama: "",
        email: "",
        phonenumber: "",
        address: {
            provinsi: "",
            kota: "",
            kecamatan: "",
            kelurahan: "",
            detail: "",
        },
    });
    const [listProvinsi, setListProvinsi] = useState([]);
    const [listKota, setListKota] = useState([]);
    const [listKecamatan, setListKecamatan] = useState([]);
    const [listKelurahan, setListKelurahan] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState(null);
    const [selectedKota, setSelectedKota] = useState(null);
    const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [selectedKelurahan, setSelectedKelurahan] = useState(null);

    useEffect(() => {
        getListProvinsi().then((res) => {
            res.forEach((item) => {
                item.name = capitalizeEachWord(item.name);
            });
            setListProvinsi(res);
        });
    }, []);

    useEffect(() => {
        console.log("show", show);
        if (show) {
            console.log("masuk show");
            getUser().then(async (res) => {
                console.log("res", res);
                const _data = { ...data };
                _data.nama = res.data.fullname;
                _data.email = res.data.email;
                _data.phonenumber = res.data.phonenumber;
                if (res.data.address.length > 0) {
                    console.log("masuk address");
                    _data.address.provinsi = res.data.address[0];
                    setSelectedProvinsi(listProvinsi.find((item) => item.name === _data.address.provinsi))
                    _data.address.kota = res.data.address[1];
                    _data.address.kecamatan = res.data.address[2];
                    _data.address.kelurahan = res.data.address[3];
                    _data.address.detail = res.data.address[4];
                }
                // console.log("data", data);
                // console.log("_data", _data);
                setData(_data);
            });
        }
    }, [show]);

    useEffect(() => {
        if (selectedProvinsi) {
            console.log("selectedProvinsi", selectedProvinsi);
            getListKota(selectedProvinsi.id).then((res) => {
                setListKota(res);
            });
        }
    }, [selectedProvinsi]);

    useEffect(() => {
        if (selectedKota) {
            console.log("selectedKota", selectedKota);
            getListKecamatan(selectedKota.id).then((res) => {
                setListKecamatan(res);
            });
        }
    }, [selectedKota]);

    useEffect(() => {
        if (selectedKecamatan) {
            console.log("selectedKecamatan", selectedKecamatan);
            getListKelurahan(selectedKecamatan.id).then((res) => {
                setListKelurahan(res);
            });
        }
    }, [selectedKecamatan]);

    useEffect(() => {
        setSelectedKota(listKota.find((item) => item.name === data.address.kota));
        setSelectedKecamatan(null)
        setSelectedKelurahan(null)
    }, [listKota]);

    useEffect(() => {
        setSelectedKecamatan(listKecamatan.find((item) => item.name === data.address.kecamatan));
        setSelectedKelurahan(null)
    }, [listKecamatan]);

    useEffect(() => {
        setSelectedKelurahan(listKelurahan.find((item) => item.name === data.address.kelurahan));
    }, [listKelurahan]);


    return (
        <Dialog
            visible={show}
            style={{ width: "698px", height: "550px", top: "4rem", position: "fixed" }}
            onHide={() => setShow(false)}
            header="Checkout Produk"
        >
            <div className="container flex flex-wrap justify-around">
                <div className="py-2 w-2/5">
                    <h6>Provinsi</h6>
                    {/* <AutoComplete
                        placeholder="e.g. JAGUNG BIASA WHL"
                        value={newProduct.name}
                        suggestions={filteredExistProduct}
                        completeMethod={search}
                        onChange={(e) => {
                            const _newProduct = { ...newProduct };
                            _newProduct.name = e.value;
                            setNewProduct(_newProduct);
                        }}
                        className="w-full"
                    /> */}
                    <Dropdown
                        value={selectedProvinsi}
                        options={listProvinsi}
                        onChange={(e) => {
                            // console.log(e.value);
                            const _data = { ...data };
                            _data.address.provinsi = e.value.name;
                            setData(_data);
                            setSelectedProvinsi(e.value);
                            getListKota(e.value.id).then((res) => {
                                setListKota(res);
                            });
                        }}
                        optionLabel="name"
                        placeholder="Pilih Provinsi"
                        checkmark={true}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Kota</h6>
                    <Dropdown
                        value={selectedKota}
                        options={listKota}
                        disabled={!selectedProvinsi}
                        onChange={(e) => {
                            const _data = { ...data };
                            _data.address.kota = e.value.name;
                            setData(_data);
                            setSelectedKota(e.value);
                            getListKecamatan(e.value.id).then((res) => {
                                setListKecamatan(res);
                            });
                        }}
                        optionLabel="name"
                        placeholder="Pilih Kota"
                        checkmark={true}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Kecamatan</h6>
                    <Dropdown
                        value={selectedKecamatan}
                        options={listKecamatan}
                        disabled={!selectedKota}
                        onChange={(e) => {
                            const _data = { ...data };
                            _data.address.kecamatan = e.value.name;
                            setData(_data);
                            setSelectedKecamatan(e.value);
                            getListKelurahan(e.value.id).then((res) => {
                                setListKelurahan(res);
                            });
                        }}
                        optionLabel="name"
                        placeholder="Pilih Kecamatan"
                        checkmark={true}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Kelurahan</h6>
                    <Dropdown
                        value={selectedKelurahan}
                        options={listKelurahan}
                        disabled={!selectedKecamatan}
                        onChange={(e) => {
                            const _data = { ...data };
                            _data.address.kelurahan = e.value.name;
                            setData(_data);
                            setSelectedKelurahan(e.value);
                        }}
                        optionLabel="name"
                        placeholder="Pilih Kelurahan"
                        checkmark={true}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Detail Alamat</h6>
                    <InputText
                        value={data.address.detail}
                        onChange={(e) => {
                            const _data = { ...data };
                            _data.address.detail = e.target.value;
                            setData(_data);
                        }}
                        disabled={!selectedKelurahan}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Nama</h6>
                    <InputText
                        value={data.nama}
                        onChange={(e) => {
                            const _data = { ...data };
                            _data.nama = e.target.value;
                            setData(_data);
                        }}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Email</h6>
                    <InputText
                        value={data.email}
                        onChange={(e) => {
                            const _data = { ...data };
                            _data.email = e.target.value;
                            setData(_data);
                        }}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>No. Telp</h6>
                    <InputText
                        value={data.phonenumber}
                        onChange={(e) => {
                            const _data = { ...data };
                            _data.phonenumber = e.target.value;
                            setData(_data);
                        }}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="flex justify-end my-3 mr-5 gap-4">
            {/* <Button
                    severity="warning"
                    onClick={() => {
                        console.log(data);
                    }}
                    className="!px-3 !py-1"
                >
                    cek
                </Button> */}
                <Button
                    severity="danger"
                    onClick={() => {
                        setShow(false);
                    }}
                    className="!px-3 !py-1"
                >
                    Batal
                </Button>
                <Button
                    disabled={!selectedProvinsi || !selectedKota || !selectedKecamatan || !selectedKelurahan || data.address.detail == "" || data.nama == "" || data.email == "" || data.phonenumber == ""}
                    severity="success"
                    onClick={() => {
                        // console.log(data);
                        // console.log(selectedCartItems);
                        handler(data, selectedCartItems);
                        setShow(false);
                    }}
                    className="!px-3 !py-1"
                >
                    Pesan
                </Button>
            </div>
        </Dialog>
    );
};