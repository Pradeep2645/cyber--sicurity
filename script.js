document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
});

function checkPasswordStrength() {
    const password = document.getElementById('passwordInput').value;
    const meter = document.getElementById('strengthMeter');
    const text = document.getElementById('strengthText');
    
    let strength = 0;
    let feedback = '';
    
    // Check length
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Check for uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Check for numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Update meter
    let percentage = (strength / 5) * 100;
    let color = '#ff4444';
    
    if (strength <= 2) {
        feedback = 'Weak password';
        color = '#ff4444';
    } else if (strength <= 3) {
        feedback = 'Fair password';
        color = '#ffbb33';
    } else if (strength <= 4) {
        feedback = 'Good password';
        color = '#00C851';
    } else {
        feedback = 'Strong password';
        color = '#007E33';
    }
    
    meter.innerHTML = `<div style="width: ${percentage}%; background-color: ${color};"></div>`;
    text.textContent = feedback;
    text.style.color = color;
}