import { useEffect, useState } from "react"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from "primereact/button";
import { addImageProduct, getProductById } from "../../utils/API/Product";
import { getBaseURLWithPrefix } from "../../utils/Helper";

export const AddProductModal = ({ show, setShow, handler }) => {
    const [dataProduct, setDataProduct] = useState({
        name: "",
        price: 0,
        description: "",
        images: [],
    })
    const [file, setFile] = useState([]);

    useEffect(() => {

    }, [file]);

    const handlerAddImage = (e) => {

        let _file = [...file, ...e.target.files];

        setFile(_file);
    }

    const handleAddProduct = async () => {
        const uploadPromises = file.map((item) => {
            const formData = new FormData();
            if (item.size > 1000000) {
                return;
            }
            formData.append("image", item);
            return addImageProduct(formData).then((res) => {
                if (res) {
                    const _dataProduct = { ...dataProduct };
                    _dataProduct.images.push(res.data.fileLocation);
                    setDataProduct(_dataProduct);
                }
            });
        });
        await Promise.all(uploadPromises);
        handler(dataProduct);
        setDataProduct({
            name: "",
            price: 0,
            description: "",
            images: [],
        })
        setFile([])
        setShow(false);
    }

    return (
        <Dialog
            visible={show}
            className="w-full h-full p-5 md:p-0 md:w-[700px] md:h-[600px] top-12 fixed"
            onHide={() => {
                setDataProduct({
                    name: "",
                    price: 0,
                    description: "",
                    images: [],
                })
                setFile([])
                setShow(false)
            }}
            header="Tambah Produk"
        >
            <div className="container flex flex-wrap justify-center gap-[10%]">
                <div className="py-2 w-2/5">
                    <h6>Nama Produk</h6>
                    <InputText
                        value={dataProduct.name}
                        onChange={(e) => {
                            const _dataProduct = { ...dataProduct };
                            _dataProduct.name = e.target.value;
                            setDataProduct(_dataProduct);
                        }}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Harga</h6>
                    <InputText
                        value={dataProduct.price}
                        onChange={(e) => {
                            const _dataProduct = { ...dataProduct };
                            _dataProduct.price = e.target.value;
                            setDataProduct(_dataProduct);
                        }}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-[90%]">
                    <h6>Deskripsi</h6>
                    <InputTextarea
                        value={dataProduct.description}
                        onChange={(e) => {
                            const _dataProduct = { ...dataProduct };
                            _dataProduct.description = e.target.value;
                            setDataProduct(_dataProduct);
                        }}
                        autoResize
                        rows={5}
                        cols={30}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-[90%]">
                    <h6 className="mb-0">Upload Image <span className="text-warning">(MAX 1MB)</span></h6>
                    {file.length == 0 && (
                        <div className="container overflow-hidden border-2 border-dashed min-h-28 flex-center">
                            <h6>
                                Drag & drop or{" "}
                                <span className="text-primary" onClick={() => {
                                    document.getElementById("upload").click();
                                }}>choose file</span> to Upload
                            </h6>
                            <p className="text-primary text-center">PNG, JPG or JPEG</p>
                        </div>
                    )}
                    {file != 0 && (<div className="container overflow-hidden border-2 border-dashed min-h-40 flex-center gap-2">
                        {file.map((item, index) => (
                            <div key={index} className="flex-center flex-col">
                                <img src={URL.createObjectURL(item)} alt="image" className="w-20 h-20 object-cover" />
                                {item.size > 1000000 && (<p className="text-red-600 text-xs">File size too large</p>)}
                                <Button icon="pi pi-times" className="size-8 mt-2" severity="danger" onClick={() => {
                                    const _file = [...file];
                                    _file.splice(index, 1);
                                    setFile(_file);
                                }} />
                            </div>
                        ))}
                        <Button icon="pi pi-plus" severity="success" className="size-10 ms-4" outlined rounded onClick={() => {
                            document.getElementById("upload").click();
                        }} />
                    </div>)}
                    <input
                        className="hidden"
                        type="file"
                        id="upload"
                        accept={"image/*"}
                        multiple
                        onChange={(e) => {
                            handlerAddImage(e);
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-end my-3 mr-5 gap-4">
                {/* <Button severity="warning" onClick={() => {
 
                }} ><span>Cek</span></Button> */}
                <Button severity="success" onClick={() => {
                    handleAddProduct()
                }} ><span>Tambahkan</span></Button>
            </div>
        </Dialog >
    )
}

export const EditProductModal = ({ show, setShow, selectedProductId, handler }) => {
    const [dataProduct, setDataProduct] = useState({
        name: "",
        price: 0,
        description: "",
        images: [],
    })
    const [file, setFile] = useState([]);

    useEffect(() => {
        if (show) {
            getProductById(selectedProductId, setDataProduct);
        }
    }, [show]);


    useEffect(() => {

    }, [dataProduct]);

    useEffect(() => {

    }, [file]);

    const handlerAddImage = (e) => {
        let _file = [...file, ...e.target.files];
        setFile(_file);
    }

    const handleEditProduct = async () => {
        const uploadPromises = file.map((item) => {
            const formData = new FormData();
            if (item.size < 1000000) {
                formData.append("image", item);
                return addImageProduct(formData).then((res) => {
                    if (res) {
                        const _dataProduct = { ...dataProduct };
                        _dataProduct.images.push(res.data.fileLocation);
                        setDataProduct(_dataProduct);
                    }
                });
            }
        });
        await Promise.all(uploadPromises);

        handler(dataProduct); setDataProduct({
            name: "",
            price: 0,
            description: "",
            images: [],
        })
        setFile([])
        setShow(false);
    }
    return (
        <Dialog
            visible={show}
            className="w-full px-5 md:px-0 md:w-[700px] md:h-[550px] top-12 fixed"
            onHide={() => {
                setDataProduct({
                    name: "",
                    price: 0,
                    description: "",
                    images: [],
                })
                setFile([])
                setShow(false)
            }}
            header="Tambah Produk"
        >
            <div className="container flex flex-wrap justify-center gap-[10%]">
                <div className="py-2 w-2/5">
                    <h6>Nama Produk</h6>
                    <InputText
                        value={dataProduct.name}
                        onChange={(e) => {
                            const _dataProduct = { ...dataProduct };
                            _dataProduct.name = e.target.value;
                            setDataProduct(_dataProduct);
                        }}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-2/5">
                    <h6>Harga</h6>
                    <InputText
                        value={dataProduct.price}
                        onChange={(e) => {
                            const _dataProduct = { ...dataProduct };
                            _dataProduct.price = e.target.value;
                            setDataProduct(_dataProduct);
                        }}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-[90%]">
                    <h6>Deskripsi</h6>
                    <InputTextarea
                        value={dataProduct.description}
                        onChange={(e) => {
                            const _dataProduct = { ...dataProduct };
                            _dataProduct.description = e.target.value;
                            setDataProduct(_dataProduct);
                        }}
                        autoResize
                        rows={5}
                        cols={30}
                        className="w-full"
                    />
                </div>
                <div className="py-2 w-[90%]">
                    <h6 className="mb-0">Image</h6>
                    {dataProduct.images.length != 0 && (<div className="container overflow-hidden border-2 border-dashed min-h-40 flex-center gap-2">
                        {dataProduct.images.map((item, index) => (
                            <div key={index} className="flex-center flex-col">
                                <img src={getBaseURLWithPrefix(item)} alt="image" className="w-20 h-20 object-cover" />
                                <Button icon="pi pi-times" className="size-8 mt-2" severity="danger" onClick={() => {
                                    // hapus image pada dataProduct
                                    const _dataProduct = { ...dataProduct };
                                    _dataProduct.images.splice(index, 1);
                                    setDataProduct(_dataProduct);
                                }} />
                            </div>
                        ))}
                    </div>)}
                </div>
                <div className="py-2 w-[90%]">
                    <h6 className="mb-0">Upload New Image <span className="text-warning">(MAX 1MB)</span></h6>
                    {file.length == 0 && (
                        <div className="container overflow-hidden border-2 border-dashed min-h-28 flex-center">
                            <h6>
                                Drag & drop or{" "}
                                <span className="text-primary" onClick={() => {
                                    document.getElementById("upload").click();
                                }}>choose file</span> to Upload
                            </h6>
                            <p className="text-primary text-center">PNG, JPG or JPEG</p>
                        </div>
                    )}
                    {file.length != 0 && (<div className="container overflow-hidden border-2 border-dashed min-h-40 flex-center gap-2">
                        {file.map((item, index) => (
                            <div key={index} className="flex-center flex-col">
                                <img src={URL.createObjectURL(item)} alt="image" className="w-20 h-20 object-cover" />
                                {item.size > 1000000 && (<p className="text-red-600 text-xs">File size too large</p>)}
                                <Button icon="pi pi-times" className="size-8 mt-2" severity="danger" onClick={() => {
                                    const _file = [...file];
                                    _file.splice(index, 1);
                                    setFile(_file);
                                }} />
                            </div>
                        ))}
                        <Button icon="pi pi-plus" severity="success" className="size-10 ms-4" outlined rounded onClick={() => {
                            document.getElementById("upload").click();
                        }} />
                    </div>)}
                    <input
                        className="hidden"
                        type="file"
                        id="upload"
                        accept={"image/*"}
                        multiple
                        onChange={(e) => {
                            handlerAddImage(e);
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-end my-3 mr-5 gap-4">
                {/* <Button severity="warning" onClick={() => {
 
                }} ><span>Cek</span></Button> */}
                <Button severity="success" onClick={() => {
                    handleEditProduct()
                }} ><span>Tambahkan</span></Button>
            </div>
        </Dialog >
    )
}