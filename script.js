document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.querySelector('button[onclick="generateQRCode()"]');
    generateBtn.addEventListener('click', handleGenerateQRCode);

    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', handleDownloadQRCode);
});

function handleGenerateQRCode() {
    const url = getUrlInputValue();
    if (isValidUrl(url)) {
        clearQRCode();
        generateQRCode(url);
        showQRCodeContainer();
    } else {
        alertInvalidUrl();
    }
}

function handleDownloadQRCode() {
    const qrcodeCanvas = getQRCodeCanvas();
    if (qrcodeCanvas) {
        downloadCanvasAsImage(qrcodeCanvas, 'qrcode.png');
    }
}

function getUrlInputValue() {
    return document.getElementById('url-input').value;
}

function isValidUrl(url) {
    return url.trim() !== '';
}

function clearQRCode() {
    document.getElementById('qrcode').innerHTML = '';
}

function generateQRCode(url) {
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 256,
        height: 256,
    });
}

function showQRCodeContainer() {
    document.getElementById('qrcode-container').style.display = 'flex';
}

function alertInvalidUrl() {
    alert('Por favor, insira um link.');
}

function getQRCodeCanvas() {
    return document.querySelector('#qrcode canvas');
}

function downloadCanvasAsImage(canvas, filename) {
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = filename;
    downloadLink.click();
}