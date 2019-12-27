import moment from 'moment';
import humanizeDuration from 'humanize-duration';

export const formatNumberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const createPlural = type => {
    if (/y$/.test(type)) {
        // Replace the ending "y" with "ies".
        return `${type.replace(/y$/, 'ies')}`;
    }
    // Words ending in "ch" are made plural by adding "es".
    if (/ch$/.test(type)) {
        return `${type}es`;
    }
    return `${type}s`;
};

/**
 * round number to a certain precision
 */
function precisionRounding(value, precision = 1) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export const computePercentDone = progress => {
    return `${precisionRounding(progress * 100)}%`;
};

export const computedDateTime = (datetime, dateTimeFormat) => {
    if (datetime === -1) return '∞';
    return moment(new Date(datetime * 1000)).format(dateTimeFormat);
}

/**
 * customize the units for time left
 */
const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
        shortEn: {
            y: () => 'y',
            mo: () => 'mo',
            w: () => 'w',
            d: () => 'd',
            h: () => 'h',
            m: () => 'm',
            s: () => 's',
            ms: () => 'ms',
        }
    }
});

const humanizerOptions = {
    largest: 2,
    round: true,
    delimiter: ' ',
    spacer: ''
};

export const computeTimeLeft = datetime => {
    return shortEnglishHumanizer(datetime * 1000, humanizerOptions);
}