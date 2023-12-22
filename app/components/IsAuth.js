'use client';

export default function isAuth() {
    try {
        let token = localStorage.getItem('id_token');
        let expiration_date = localStorage.getItem('expiration_date');
        if (token && expiration_date) {
            let dateDiff = parseInt(expiration_date) - Date.now() / 1000;
            if (dateDiff > 0) return true;
        }
        return false;
    } catch (error) {
        console.log(error)
    }

}