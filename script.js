let mainMail = document.getElementById('main-mail');

let ccBtn = document.getElementById('cc-btn');
let cc = document.getElementById('cc');
let ccMail = document.getElementById('cc-mail');

let bccBtn = document.getElementById('bcc-btn');
let bcc = document.getElementById('bcc');
let bccMail = document.getElementById('bcc-mail');

let subject = document.getElementById('mail-subject');

let body = document.getElementById('mail-body');

let linkDiv = document.getElementById('link');
let link = document.getElementById('link-generated');

let copyBtn = document.getElementById('copy-btn')

ccBtn.onclick = function() {
    display(cc);
    if (cc.style.display === 'none')
        ccMail.value = '';
    updateLink();
};

bccBtn.onclick = function() {
    display(bcc);
    if (bcc.style.display === 'none')
        bccMail.value = '';
    updateLink();
}

function display(element) {
    if (element.style.display === "none")
        element.style.display = "block";
    else
        element.style.display = "none";
}

function isValidEmail(email) {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let tabMail = email.split(',');
    for (let i = 0; i < tabMail.length; i++)
    {
        if (mailRegex.test(tabMail[i]) == false && tabMail[i].length > 0)
            return false;
    }
    return true;
}

function checkMail(element, isValid) {
    if (isValid)
        element.style.color = 'black';
    else
        element.style.color = 'brown';
    updateLink();
}

mainMail.addEventListener('keydown', function(event) {
    if (event.key === ' ')
        event.preventDefault();
});

mainMail.onkeyup = function() {
    checkMail(mainMail, isValidEmail(mainMail.value));
}

ccMail.addEventListener('keydown', function(event) {
    if (event.key === ' ')
        event.preventDefault();
});

ccMail.onkeyup = function() {
    checkMail(ccMail, isValidEmail(ccMail.value));
}

bccMail.addEventListener('keydown', function(event) {
    if (event.key === ' ')
        event.preventDefault();
});

bccMail.onkeyup = function() {
    checkMail(bccMail, isValidEmail(bccMail.value));
}

subject.addEventListener('keyup', updateLink);

body.addEventListener('keyup', updateLink);

function updateLink() {
    let generateLink;
    generateLink = 'mailto:' + mainMail.value;
    if (ccMail.value)
        generateLink += '&cc:' + ccMail.value;
    if (bccMail.value)
        generateLink += '&bcc:' + bccMail.value;
    if (subject.value)
        generateLink += '?subject=' + encodeURIComponent(subject.value);
    if (body.value)
    {
        subject.value ? generateLink += '&' : generateLink += '?'
        generateLink += 'body=' + encodeURIComponent(body.value);
    }
    link.innerHTML = generateLink;
    copyBtn.innerHTML = "Copy link";
    checkLink();
}

function checkLink() {
    if (mainMail.value.length > 0 && isValidEmail(mainMail.value)
        && ((ccMail.value.length > 0 && isValidEmail(ccMail.value)) || ccMail.value.length == 0)
        && ((bccMail.value.length > 0 && isValidEmail(bccMail.value)) || bccMail.value.length == 0)
    )
        linkDiv.style.display = 'flex';
    else
        linkDiv.style.display = 'none';
}

function copyLink() {
    navigator.clipboard.writeText(link.innerText)
    .then(() =>{
        copyBtn.innerHTML = "Copied !"});
}