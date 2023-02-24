const intlNumberKo = new Intl.NumberFormat("ko", {
    notation: "compact",
    compactDisplay: "long",
});
const intlTimeKo = new Intl.DateTimeFormat("ko", {
    dateStyle: "short",
    timeStyle: "short",
});
const intlNumberEn = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
});
export { intlNumberKo, intlTimeKo, intlNumberEn };
