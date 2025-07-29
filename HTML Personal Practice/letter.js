function generateLetter() {
    var recipientName = document.getElementById('recipientName').value;
    var letterBody = document.getElementById('letterBody').value;

    var generatedLetter = `Dear ${recipientName},\n\n${letterBody}\n\nSincerely,\n[Your Name]`;

    document.getElementById('generatedLetter').innerText = generatedLetter;
}