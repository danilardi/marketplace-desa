import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/FormatUtils';
import { useEffect, useState } from 'react';
import { fetchCart, updateCart } from '../utils/API/Cart';
import { getBaseURLWithPrefix } from '../utils/Helper';
import { debounce } from 'lodash';
import { CheckoutDataModal } from '../components/CartPage';
import { getUser, updateUser } from '../utils/API/Auth';
import { UpdateUserRequest } from '../model/UserModel';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedCartItems, setSelectedCartItems] = useState([]);
    const [showCheckoutDataModal, setShowCheckoutDataModal] = useState(false);

    useEffect(() => {
        fetchCart(setCartItems);
    }, []);

    useEffect(() => {
        let total = 0;
        selectedItems.forEach((selected, index) => {
            if (selected) {
                total += cartItems[index].price * cartItems[index].quantity;
            }
        });
        setTotalPrice(total);
    }, [selectedItems, cartItems]);

    /* 
    {
        "id": "wishlist-F1p-e4KDLMtxAWMz",
        "product_id": "product-2E1z6D3LyySvYCZe",
        "name": "1722487208 - Product 4",
        "quantity": 1
    }
     */

    const handleOnCLick = () => {
        // console.log(new UpdateUserRequest("user-1", "Rizky", "sdsf", "sdf"));
        getUser();
        // getProvince();
    }

    const handleCheckout = (data, items) => {
        updateUser(new UpdateUserRequest(data.nama, data.email, data.phonenumber, data.address.provinsi, data.address.kota, data.address.kecamatan, data.address.kelurahan, data.address.detail));

        console.log("Checkout data", data)
        console.log("Checkout items", items)
        const message = `Halo Kak, saya ${data.nama} mau pesan barang dengan detail sebagai berikut: \n\nNama: ${data.nama}\nEmail: ${data.email}\nNo. Telepon: ${data.phonenumber}\nAlamat: ${data.address.detail}, ${data.address.kelurahan}, ${data.address.kecamatan}, ${data.address.kota}, ${data.address.provinsi}\n\nBarang yang dipesan:\n${items.map((item, index) => `${index + 1}. ${item.name} - ${item.quantity} pcs - ${formatCurrency(item.price)}/pcs - total ${formatCurrency(item.price * item.quantity)}\n`).join('')}\nTotal: ${formatCurrency(totalPrice)}`;
        const noHp = '6285376279800';
        const url = `https://wa.me/${noHp}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }

    const debouncedUpdateCart = debounce((index) => {
        // console.log('debouncedUpdateCart', index, cartItems[index].id);
        const updateRequest = {
            id: cartItems[index].id,
            orderQuantity: cartItems[index].quantity
        }
        updateCart(updateRequest);
    }, 1000)

    const incrementQuantity = (index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity += 1;
        setCartItems(newCartItems);
        debouncedUpdateCart(index);
    };

    const decrementQuantity = (index) => {
        if (cartItems[index].quantity > 1) {
            const newCartItems = [...cartItems];
            newCartItems[index].quantity -= 1;
            setCartItems(newCartItems);
            debouncedUpdateCart(index);
        }
    };

    return (
        <>
            {/* breadcumbs */}
            <div className="breadcrumbs text-md pt-4">
                <ul>
                    <li className="text-primary">
                        <Link to={'/'}>
                            <i className="fi fi-rs-home pe-2 flex mb-0.5"></i>Home
                        </Link>
                    </li>
                    <li><span className="inline-flex items-center gap-2">Keranjang</span></li>
                </ul>
            </div>
            {/* <Button className="!px-4 !py-2" severity='danger' onClick={handleOnCLick}>Testing</Button> */}
            <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 py-4">
                {/* Items */}
                <div className="lg:basis-9/12 border rounded-md shadow-md bg-white px-4 pt-2 overflow-x-auto">
                    {/* header */}
                    <table className='table p-2 w-full'>
                        <thead>
                            <tr className='border-b-2 border-base-300'>
                                <th
                                    scope='col'
                                    className='th-default'>
                                    {/* <input type="checkbox" className="checkbox checkbox-primary size-5" onClick={() => {

                                        let _selectedItems = selectedItems.map(() => true);
                                        setSelectedItems(_selectedItems);
                                    }} /> */}
                                </th>
                                <th
                                    scope='col'
                                    className='th-default text-left'>
                                    Produk
                                </th>
                                <th
                                    scope='col'
                                    className='th-default text-center'>
                                    Harga Satuan
                                </th>
                                <th
                                    scope='col'
                                    className='th-default text-center'>
                                    Kuantitas
                                </th>
                                <th
                                    scope='col'
                                    className='th-default text-center'>
                                    Total Harga
                                </th>
                                <th
                                    scope='col'
                                    className='th-default text-center'>
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        {/* body */}
                        {/* 
                            {
                                "id": "wishlist-nra2FqF_gZHySVCq",
                                "name": "1722098865 - Jeruk",
                                "quantity": 20
                            } 
                        */}
                        <tbody>
                            {/* item */}
                            {cartItems.map((item, index) => (
                                <tr key={item.id} className={cartItems.length != index + 1 ? "border-b-2 border-base-300" : ""}>
                                    <td className='td-default'>
                                        <input type="checkbox" className="checkbox checkbox-primary size-5" onClick={(e) => {
                                            let _selectedItems = [...selectedItems];
                                            _selectedItems[index] = e.target.checked;
                                            setSelectedItems(_selectedItems);
                                        }} />
                                    </td>
                                    <td className='td-default flex items-center gap-2'>
                                        {item.images && <img src={`${getBaseURLWithPrefix(item.images[0])}`} alt={item.name} className="h-16 image" />}
                                        {!item.images && <img src={`https://picsum.photos/400/200?random=${index}`} alt={item.name} className="h-16 image" />}
                                        <div className='w-full overflow-hidden'>
                                            <p className='text-ellipsis overflow-hidden w-full text-md'>{item.name}</p>
                                            <p className="text-ellipsis overflow-hidden w-full text-sm text-gray-500">{item.description}</p>
                                        </div>
                                    </td>
                                    <td className='td-default text-center'>{formatCurrency(item.price)}</td>
                                    <td className='td-default'>
                                        <div className='flex-center gap-4 min-h-full'>
                                            <Button
                                                rounded
                                                outlined
                                                className='p-button-icon-only size-8'
                                                onClick={() => {
                                                    // if (item.quantity > 1) {
                                                    // let _cartItems = [...cartItems];
                                                    // _cartItems[index].quantity -= 1;
                                                    // setCartItems(_cartItems);
                                                    // debouncedQuantity(index);}
                                                    decrementQuantity(index);
                                                }}
                                            >
                                                <i className="pi pi-minus text-sm"></i>
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button
                                                rounded
                                                className='p-button-icon-only size-8'
                                                onClick={() => {
                                                    // let _cartItems = [...cartItems];
                                                    // _cartItems[index].quantity += 1;
                                                    // setCartItems(_cartItems);
                                                    // debouncedQuantity(index);
                                                    incrementQuantity(index);
                                                }}
                                            >
                                                <i className="pi pi-plus text-sm"></i>
                                            </Button>
                                        </div>
                                    </td>
                                    <td className='td-default text-center'>{formatCurrency(item.price * item.quantity)}</td>
                                    <td className='td-default'>
                                        <Button className="!px-4 !py-2" severity='danger'>
                                            <span className='text-sm'>Hapus</span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Summary */}
                <div className="lg:basis-3/12 border rounded-md shadow-md bg-white p-4 w-full lg:size-fit lg:top-24 sticky bottom-4">
                    <h2 className="text-lg font-bold">Ringkasan Belanja</h2>
                    <div className='flex justify-between mt-4'>
                        <h2 className="text-sm font-light">Total:</h2>
                        <h2 className="text-sm font-semibold">{formatCurrency(totalPrice)}</h2>
                    </div>
                    <div className="divider divider-base-300 mt-4"></div>
                    <Button
                        disabled={totalPrice === 0}
                        className='w-full h-10'
                        onClick={() => {
                            let _selectedCartItems = [];
                            selectedItems.forEach((selected, index) => {
                                if (selected) {
                                    _selectedCartItems.push(cartItems[index]);
                                }
                            });
                            // console.log(_selectedCartItems);
                            setSelectedCartItems(_selectedCartItems);
                            setShowCheckoutDataModal(true);
                        }}>
                        <span className='text-md font-bold'>Checkout</span>
                    </Button>
                </div>
            </div >
            <CheckoutDataModal
                show={showCheckoutDataModal}
                setShow={setShowCheckoutDataModal}
                selectedCartItems={selectedCartItems}
                handler={handleCheckout}
            />
        </>
    );
};

export default Cart;