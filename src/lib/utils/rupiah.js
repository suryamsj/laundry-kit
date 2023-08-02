export function formatNumberToCurrency(number) {
    if (isNaN(number)) {
        return "0";
    }

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return formatter.format(number);
}