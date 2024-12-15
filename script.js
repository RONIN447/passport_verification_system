document.addEventListener('DOMContentLoaded', () => {
    const verifyButton = document.querySelector('#verify-btn');
    const passportInput = document.querySelector('#passport-input');
    const resultContainer = document.querySelector('#result-container');
    const resultTableBody = document.querySelector('#result');
    const errorMessage = document.querySelector('#error-message');
  
    verifyButton.addEventListener('click', async (event) => {
      event.preventDefault();
  
      const passportNumber = passportInput.value.trim();
  
      // Clear previous results and messages
      resultTableBody.innerHTML = '';
      resultContainer.classList.add('hidden');
      errorMessage.textContent = '';
      errorMessage.classList.add('hidden');
  
      if (!passportNumber) {
        errorMessage.textContent = 'Please enter a passport number!';
        errorMessage.classList.remove('hidden');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passportNumber }),
        });
  
        if (response.ok) {
          const data = await response.json();
  
          // Populate the table with data
          resultTableBody.innerHTML = `
            <tr>
              <td>${data.name}</td>
              <td>${data.age}</td>
              <td>${data.nationality}</td>
              <td>${data.issueDate}</td>
            </tr>
          `;
  
          resultContainer.classList.remove('hidden');
        } else {
          const errorData = await response.json();
          errorMessage.textContent = errorData.message || 'Verification failed!';
          errorMessage.classList.remove('hidden');
        }
      } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.classList.remove('hidden');
      }
    });
  });
  