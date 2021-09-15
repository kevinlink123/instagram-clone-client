export default function fileHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(user && user.accessToken) {
        return { 
            "x-access-token": user.accessToken,
            "Content-Type": "multipart/form-data"
        };
    } else {
        return {};
    };
};