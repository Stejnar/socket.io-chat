export default function logger(incoming, type, payload) {
    const titleColor = 'color: #9E9E9E;';
    const actionColor = 'color: #03A9F4;';
    type = type.toUpperCase();
    incoming = incoming ? 'RECEIVING' : 'BROADCASTING';
    if(console.group) {
        console.group('%c socket', titleColor, incoming);
        console.log('%c action', actionColor, {type, payload});
        console.groupEnd();
    }
}