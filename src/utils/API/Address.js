import axios from "axios";
import { capitalizeEachWord } from "../Helper";

export const getListProvinsi = async () => {
    try {
        const res = await axios.get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
        if (res) {
            // console.log(res);
            res.data.forEach((item) => {
                item.name = capitalizeEachWord(item.name);
            });
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getListKota = async (provinceId) => {
    try {
        const res = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
        if (res) {
            // console.log(res);
            res.data.forEach((item) => {
                item.name = capitalizeEachWord(item.name);
            });
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getListKecamatan = async (cityId) => {
    try {
        const res = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`);
        if (res) {
            // console.log(res);
            res.data.forEach((item) => {
                item.name = capitalizeEachWord(item.name);
            });
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getListKelurahan = async (districtId) => {
    try {
        const res = await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`);
        if (res) {
            // console.log(res);
            res.data.forEach((item) => {
                item.name = capitalizeEachWord(item.name);
            });
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}