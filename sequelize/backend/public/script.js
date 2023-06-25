document.getElementById('registerButton').addEventListener('click', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    console.log(response);

    if (response.ok) {
      alert('User registered successfully');
    } else if (response.status === 409) {
      alert('Email already exists');
    } else {
      alert('Error registering user');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred');
  }
});
//forget password
document.getElementById('forgotPasswordButton').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById('forgotEmail').value;
  const newPassword = document.getElementById('newPassword').value;

  try {
    const response = await fetch('/api/forgotpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    if (response.ok) {
      alert('Password updated successfully');
    } else if (response.status === 404) {
      alert('User not found');
    } else {
      alert('Error updating password');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred');
  }
});
//see details
document.getElementById('detailsofuser').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById('detailEmail').value;
  console.log(email)
  try {
    const response = await fetch(`/api/detailsofuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const user = await response.json();
      document.getElementById('userdetails').textContent = `Name: ${user.name}, Email: ${user.email}`;
    } else if (response.status === 404) {
      document.getElementById('userdetails').textContent = 'User not found';
    } else {
      document.getElementById('userdetails').textContent = 'Error retrieving user details';
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred');
  }
});

//delete user
document.getElementById('deleteuser').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById('deleteEmail').value;
  console.log(email)
  try {
    const response = await fetch(`/api/deleteuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const user = await response.json();
      document.getElementById('deleteduser').textContent = `Name: ${user.name}, Email: ${user.email} Deleted Successfully`;
    } else if (response.status === 404) {
      document.getElementById('deleteduser').textContent = 'User not found';
    } else {
      document.getElementById('deleteduser').textContent = 'Error in deleting user details';
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred');
  }
});

