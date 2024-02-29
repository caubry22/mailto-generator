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


ccBtn.addEventListener('click', function() {
    display(cc);
    updateLink();
});

bccBtn.addEventListener('click', function() {
    display(bcc);
    updateLink();
});

function display(element) {
    if (element.style.display === "none")
        element.style.display = "block";
    else
        element.style.display = "none";
};

mainMail.addEventListener('keyup', updateLink);

ccMail.addEventListener('keyup', updateLink);

bccMail.addEventListener('keyup', updateLink);

subject.addEventListener('keyup', updateLink);

body.addEventListener('keyup', updateLink);

function updateLink() {
    let generateLink;
    generateLink = 'mailto:' + mainMail.value;
    if (ccMail.value && cc.style.display === 'block')
        generateLink += '&cc=' + ccMail.value;
    if (bccMail.value && bcc.style.display === 'block')
        generateLink += '&bcc=' + bccMail.value;
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
    if (mainMail.value.length > 0)
        linkDiv.style.display = 'flex';
    else
        linkDiv.style.display = 'none';
}

function copyLink() {
    navigator.clipboard.writeText(link.innerText)
    .then(() =>{
        copyBtn.innerHTML = "Copied !"});
}