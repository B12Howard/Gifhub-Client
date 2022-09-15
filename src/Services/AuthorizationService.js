/**
 * This function checks the user's localstorage for a jwt token to determine whether the token is still valid
 *
 * @return {{type: sting, status: bool}} key value pair
 */
function isTokenValid() {
    const token = localStorage.getItem('idToken');
    const now = new Date().valueOf();

    if (token !== undefined && token !== null && token !== '') {
        const tokenParts = token.split(/\./);
        const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
        const jwtDate = new Date(tokenDecoded.exp * 1000);
        const newDate = new Date();
        const isExp = newDate > jwtDate;

        if (isExp) {
            localStorage.clear();
            return { type: 'normal', status: false };
        }

        // Valid token
        if (now < jwtDate) {
            return { type: 'normal', status: true };
        }
    } else {
        localStorage.clear();
        return { type: 'normal', status: false };
    }
}

/**
 * returns a key value pair {pathname: string, message: string, Any}
 *
 * @param {string} resStatus custom message describing server response
 * @param {string} resMessage user displayable message
 * @param {{}} res http response code
 * @return {{pathname: sting, message: string, {}}} key value pair
 */
//   function checkServiceResponse(resJson, res) {
//     // console.log("What auth sees");
//     // console.log(resJson);
//     if (res.status === 200 || resJson.status === "paused_running" || resJson.status === "renew_running") {
//       return {
//         pathname: "",
//         message: resJson.message,
//         resStatus: resJson.status,
//         statusInt: res.status,
//       };
//     } else if (res.status === 402) {
//       // Non-payment
//       localStorage.clear();
//       let redirectPath = "/Login";
//       return {
//         pathname: redirectPath,
//         message: resJson.message,
//         resStatus: resJson.status,
//         statusInt: res.status,
//         session_url: resJson.data.session_url,
//       };
//     } else if (res.status === 401) {
//       // Unauthorized
//       let redirectPath = "/Login";
//       // CLEAR TOKEN
//       localStorage.clear();
//       return { pathname: redirectPath, message: resJson.message, resStatus: resJson.status, statusInt: res.status };
//       // REDIRECT TO LOGIN
//     } else if (res.status === 403) {
//       // Forbidden

//       localStorage.clear();
//       let redirectPath = "/Login";
//       return { pathname: redirectPath, message: resJson.message, resStatus: resJson.status, statusInt: res.status };
//     }
//   }
export { isTokenValid };
