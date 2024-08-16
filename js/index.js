
document.getElementById("time1").addEventListener("input", handleTimeInput);
document.getElementById("time2").addEventListener("input", handleTimeInput);

function handleTimeInput(event) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 6) {
        input = input.slice(0, 6);
    }

    event.target.value = formatTimeValue(input);
    calculateTimeDifference();
}


function calculateTimeDifference() {
    const time1 = document.getElementById("time1").value;
    const time2 = document.getElementById("time2").value;

    if (isValidTimeFormat(time1) && isValidTimeFormat(time2)) {
        const time1Seconds = toSeconds(time1);
        const time2Seconds = toSeconds(time2);

        const differenceInSeconds = Math.abs(time2Seconds - time1Seconds);

        const hours = Math.floor(differenceInSeconds / 3600);
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const seconds = differenceInSeconds % 60;

        document.getElementById("result").innerHTML =
            `Fark: <span>${hours}</span> saat, <span>${minutes}</span> dakika, <span>${seconds}</span> saniye`;
    } else {
        document.getElementById("result").innerHTML = "";
    }
}


function formatTimeValue(time) {

    if (isValidTimeFormat(time)) return time;


    if (/^\d{6}$/.test(time)) {
        return `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`;
    }

    return time;
}

function toSeconds(time) {
    const parts = time.split(':');
    return (+parts[0]) * 3600 + (+parts[1]) * 60 + (+parts[2]);
}

function isValidTimeFormat(time) {
    return /^\d{2}:\d{2}:\d{2}$/.test(time);
}
