import Swal from 'sweetalert2'

export const notFound = (message) => {
    return Swal.fire({
        title: "Error!",
        text: `${message || "Not Found"}`,
        icon: "error",
        // timer: 1000,
    });
};

export const badRequest = (message) => {
    return Swal.fire({
        title: "Error!",
        text: `${message || "Bad Request"}`,
        icon: "error",
        // timer: 5000,
    });
};
export const mustLogin = (message) => {
    return Swal.fire({
        title: "Error!",
        text: `${message || "Must Login"}`,
        icon: "error",
        // timer: 5000,
    });
};

export const Forbidden = (message) => {
    return Swal.fire({
        title: "Error!",
        text: `${message || "Forbidden"}`,
        icon: "error",
        // timer: 1000,
    });
};

export const Success = (message) => {
    return Swal.fire({
        title: "Success",
        icon: "success",
        text: `${message || "Berhasil"}`,
        // timer: 1000,
    })
}

export const Error = (message) => {
    return Swal.fire({
        title: "Error",
        icon: "error",
        text: `${message || "Gagal"}`,
        // timer: 500,
    })
}

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export const ToastSuccess = (message) => Toast.fire({
    icon: "success",
    title: `${message || "Success"}`
});

export const ToastError = (message) => Toast.fire({
    icon: "error",
    title: `${message || "Error"}`
});

export const ToastWarning = (message) => Toast.fire({
    icon: "warning",
    title: `${message || "Warning"}`
});