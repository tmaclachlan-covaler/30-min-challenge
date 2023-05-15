export default function applyDiscount(total: number, hasMembership = false) {
    if (total < 500)
        return total;

    // to calculate total discount
    let multiplier = 1;

    if (hasMembership) {
        multiplier -= 0.1;
    }

    if (total >= 1000) {
        multiplier -= 0.1;

        return total * multiplier;
    }

    multiplier -= 0.05;
    return total * multiplier;
}