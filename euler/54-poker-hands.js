const cardsWeight = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const royalFlush = (cards) => {
    const hasA = !!cards
                .map(card => createCard(card))
                .find((co) => co.number === 'A')

    return flush(cards) && straight(cards) && hasA;
}

const straight = (cards) => {
    return cards
            .map(card => createCard(card))
            .map(co => cardsWeight.indexOf(co.number))
            .sort((a, b) => a - b)
            .map((num, index, arr) => num - arr[0])
            .reduce((acc, num) => acc + num, 0) === 10;
}

const flush = (cards) => {
    return cards
            .map(card => createCard(card))
            .map(co => co.sign)
            .every((sign, index, arr) => arr[0] === sign);
}

const onePair = (cards) => Object.values(countByNumber(cards)).includes(2);
const twoPairs = (cards) => Object.values(countByNumber(cards)).filter((num) => num === 2).length === 2;
const threeOfKind = (cards) => Object.values(countByNumber(cards)).includes(3);
const fourOfKind = (cards) => Object.values(countByNumber(cards)).includes(4);
const straightFlush = (cards) => flush(cards) && straight(cards);

const fullHouse = (cards) => {
    const a = Object.values(countByNumber(cards));
    return a.includes(3) && a.includes(2);
};

const countByNumber = (cards) => {
    return cards
            .map(card => createCard(card))
            .reduce((acc, co) => {
                if (!acc[co.number]) acc[co.number] = 0;
                acc[co.number]++;

                return acc
            }, {});
}

const sortHand = (cards) => cards.sort((a, b) => {
        const cardA = createCard(a);
        const cardB = createCard(b);

        const wA = cardsWeight.indexOf(cardA.number) + (cardA.sign.charCodeAt(0) / 100);
        const wB = cardsWeight.indexOf(cardB.number) + (cardB.sign.charCodeAt(0) / 100);

        return wA - wB;
    });

const createCard = (card) => ({number: card[0], sign: card[1]});

exports.sortHand = sortHand;
exports.royalFlush = royalFlush;
exports.straight = straight;
exports.flush = flush;
exports.onePair = onePair;
exports.threeOfKind = threeOfKind;
exports.fourOfKind = fourOfKind;
exports.countByNumber = countByNumber;
exports.twoPairs = twoPairs;
exports.fullHouse = fullHouse;
exports.straightFlush = straightFlush;