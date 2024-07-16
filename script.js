document.getElementById('generateBtn').addEventListener('click', async function() {
  const mobileNumber = document.getElementById('mobileNumber').value;
  if (validateMobileNumber(mobileNumber)) {
    const response = await fetch('http://localhost:3000/generate-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileNumber })
    });
    const data = await response.json();
    document.getElementById('otp').innerText = `${data.otp}`;
  } else {
    alert('Please enter a valid mobile number.');
  }
});

document.getElementById('verifyBtn').addEventListener('click', async function() {
  const mobileNumber = document.getElementById('mobileNumber').value;
  const otp = document.getElementById('otpInput').value;
  const response = await fetch('http://localhost:3000/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobileNumber, otp })
  });
  const data = await response.json();
  if (data.success) {
    document.getElementById('verificationResult').innerText = 'OTP Verified!';
  } else {
    document.getElementById('verificationResult').innerText = 'Invalid OTP. Please try again.';
  }
});

function validateMobileNumber(number) {
  const regex = /^\d{10}$/;
  return regex.test(number);
}
