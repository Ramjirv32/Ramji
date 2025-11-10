// Test login credentials
const testLogin = async () => {
  const API_URL = 'http://localhost:9000';
  
  console.log('Testing admin login...\n');
  
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: 'ramjib2311@gmail.com', 
        password: 'Vikas@231112005' 
      }),
    });

    const data = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', data);
    
    if (response.ok && data.role === 'admin') {
      console.log('\n✅ LOGIN SUCCESS!');
      console.log('Admin credentials are working correctly.');
    } else {
      console.log('\n❌ LOGIN FAILED!');
      console.log('Message:', data.message);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
};

testLogin();
