const translations = {
    'tr': {
        title: "Zaman Farkı Hesaplayıcı",
        time1Placeholder: "İlk Zaman (örn: 00:59:23)",
        time2Placeholder: "İkinci Zaman (örn: 01:45:35)",
        resultPrefix: "Fark:",
        hour: "saat",
        minute: "dakika",
        second: "saniye",
        copyBtn: "📋 Kopyala",
        copySuccess: "✅ Kopyalandı!",
        clearBtn: "🧹 Temizle",
        commentTemplate: "4.3 - Müşteri memnuniyeti adına RO'ya gecikmemeye dikkat etmemiz gerekmektedir {time1} - {time2}"
    },
    'ru': {
        title: "Калькулятор Разницы Времени",
        time1Placeholder: "Первое Время (напр: 00:59:23)",
        time2Placeholder: "Второе Время (напр: 01:45:35)",
        resultPrefix: "Разница:",
        hour: "час",
        minute: "минут",
        second: "секунд",
        copyBtn: "📋 Копировать",
        copySuccess: "✅ Скопировано!",
        clearBtn: "🧹 Очистить",
        commentTemplate: "4.3 - Для удовлетворения клиентов мы должны быть внимательны ve не опаздывать с RO. {time1} - {time2}"
    }
};

let currentLang = 'tr'; 

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    document.getElementById("appTitle").textContent = t.title;
    document.getElementById("mainTitle").textContent = t.title;
    document.getElementById("time1").placeholder = t.time1Placeholder;
    document.getElementById("time2").placeholder = t.time2Placeholder;
    document.getElementById("copyBtn").innerHTML = t.copyBtn;
    document.getElementById("clearBtn").innerHTML = t.clearBtn;
    
    calculateTimeDifference();
}

document.getElementById("time1").addEventListener("input", handleTimeInput);
document.getElementById("time2").addEventListener("input", handleTimeInput);
document.getElementById("copyBtn").addEventListener("click", copyToClipboard);
document.getElementById("clearBtn").addEventListener("click", handleClear);
document.getElementById("copyCommentBtn").addEventListener("click", copyCommentToClipboard);


const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedLang = this.getAttribute('data-lang');
        
        langButtons.forEach(btn => btn.classList.remove('active'));

        this.classList.add('active');

        setLanguage(selectedLang);
    });
});



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
    const t = translations[currentLang];
    const commentOutput = document.getElementById("commentOutput");
    const hiddenCommentCopyInput = document.getElementById("hiddenCommentCopyInput");
    const copyCommentBtn = document.getElementById("copyCommentBtn");


    if (isValidTimeFormat(time1) && isValidTimeFormat(time2)) {
        const time1Seconds = toSeconds(time1);
        const time2Seconds = toSeconds(time2);

        const differenceInSeconds = Math.abs(time2Seconds - time1Seconds);

        const hours = Math.floor(differenceInSeconds / 3600);
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const seconds = differenceInSeconds % 60;

        document.getElementById("result").innerHTML = 
            `${t.resultPrefix} <span>${hours}</span> ${t.hour}, <span>${minutes}</span> ${t.minute}, <span>${seconds}</span> ${t.second}`;

        document.getElementById("hiddenCopyInput").value = `${time1} - ${time2}`;

        const comment = t.commentTemplate
            .replace('{time1}', time1)
            .replace('{time2}', time2);

        commentOutput.textContent = comment;
        hiddenCommentCopyInput.value = comment;
        copyCommentBtn.style.display = 'block'; 

    } else {
        document.getElementById("result").innerHTML = "";
        document.getElementById("hiddenCopyInput").value = "";
        
        commentOutput.textContent = "";
        hiddenCommentCopyInput.value = "";
        copyCommentBtn.style.display = 'none'; 
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



function copyToClipboard() {
    const hiddenInput = document.getElementById("hiddenCopyInput");

    if (!hiddenInput.value) {
        return;
    }

    hiddenInput.select();
    hiddenInput.setSelectionRange(0, 99999);
    document.execCommand("copy");

    const t = translations[currentLang];
    let copyBtn = document.getElementById("copyBtn");
    copyBtn.innerHTML = t.copySuccess;
    copyBtn.style.backgroundColor = "#28a745"; 

    
    setTimeout(() => {
        copyBtn.innerHTML = t.copyBtn;
        copyBtn.style.backgroundColor = "#858992"; 
    }, 750);
}

function copyCommentToClipboard() {
    const hiddenInput = document.getElementById("hiddenCommentCopyInput");

    if (!hiddenInput.value) {
        return;
    }

    hiddenInput.select();
    hiddenInput.setSelectionRange(0, 99999);
    document.execCommand("copy");

    let copyBtn = document.getElementById("copyCommentBtn");
    const originalText = copyBtn.innerHTML;

    copyBtn.innerHTML = "✅";
    copyBtn.style.backgroundColor = "#28a745"; 

    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.backgroundColor = "#858992"; 
    }, 750);
}



function handleClear() {
    document.getElementById("time1").value = "";
    document.getElementById("time2").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("hiddenCopyInput").value = "";
    
    
    document.getElementById("commentOutput").textContent = "";
    document.getElementById("hiddenCommentCopyInput").value = "";
    document.getElementById("copyCommentBtn").style.display = 'none';

    let clearBtn = document.getElementById('clearBtn');
    clearBtn.style.backgroundColor = "#c9302c"


    setTimeout(() => {
        clearBtn.style.backgroundColor = "#858992"; 
    }, 750);

};


document.addEventListener('DOMContentLoaded', () => {
    setLanguage('tr');
});