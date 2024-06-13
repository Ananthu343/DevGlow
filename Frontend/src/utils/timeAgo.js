export function timeAgo(time) {
    let timeValue;
    switch (typeof time) {
        case 'number':
            timeValue = time;
            break;
        case 'string':
            timeValue = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) {
                timeValue = time.getTime();
            } else {
                timeValue = +new Date();
            }
            break;
        default:
            timeValue = +new Date();
    }

    const seconds = (+new Date() - timeValue) / 1000;
    const token = seconds >= 0 ? 'ago' : 'from now';
    const listChoice = seconds >= 0 ? 1 : 2;

    const timeFormats = [
        [60, 'seconds', 1],
        [120, '1 minute ago', '1 minute from now'],
        [3600, 'minutes', 60],
        [7200, '1 hour ago', '1 hour from now'],
        [86400, 'hours', 3600],
        [172800, 'Yesterday', 'Tomorrow'],
        [604800, 'days', 86400],
        [1209600, 'Last week', 'Next week'],
        [2419200, 'weeks', 604800],
        [4838400, 'Last month', 'Next month'],
        [29030400, 'months', 2419200],
        [58060800, 'Last year', 'Next year'],
        [2903040000, 'years', 29030400],
        [5806080000, 'Last century', 'Next century'],
        [58060800000, 'centuries', 2903040000]
    ];

    if (seconds < 60) {
        return 'Just now';
    }

    if (seconds === 0) {
        return 'Just now';
    }

    for (let i = 0; i < timeFormats.length; i++) {
        const format = timeFormats[i];
        if (seconds < format[0]) {
            if (typeof format[2] === 'string') {
                return format[listChoice];
            } else {
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        }
    }

    return timeValue;
}
