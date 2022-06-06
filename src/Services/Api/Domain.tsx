/**
 * Choose the correct backend url by looking at the user's hostname
 *
 * @return {string} backend url
 */
export default function Domain() {
    if (window.location.hostname === 'apps.filtpod.com') {
        return 'https://filtpod.pythonanywhere.com/';
    } else if (
        window.location.hostname === 'filtpod-frontend-test.web.app' ||
        window.location.hostname === 'filtpod-frontend-test.firebaseapp.com'
    ) {
        return 'https://test.filtpod.com/';
    } else {
        return 'http://localhost:5020/';
    }
}
