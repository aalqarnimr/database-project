const donorFields = document.getElementById('donor-fields');
    const donorRadio = document.getElementById('donor');
    const recipientRadio = document.getElementById('recipient');

    function toggleDonorFields() {
        if (donorRadio.checked) {
            donorFields.style.display = 'block';
        } else {
            donorFields.style.display = 'none';
        }
    }

    donorRadio.addEventListener('change', toggleDonorFields);
    recipientRadio.addEventListener('change', toggleDonorFields);
    toggleDonorFields();