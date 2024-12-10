export default function checkIfAuth() {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("role")) {
        return true;
    }

    return false;
}
