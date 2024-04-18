export const loginUser = async (username, password) => {
    const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        throw new Error('Failed to Login')
    }
};

export const registerUser = async (firstName, lastName, username, password) => {
    const response = await fetch(`http://localhost:8000/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, username, password })
    });
    if (!response.ok) {
      throw new Error('Failed to register');
    }
  };

  export const getItems = async () => {
    const response = await fetch('http://localhost:8000/item');
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
  };

  export const createItem = async (name, description, quantity) => {
    const response = await fetch('http://localhost:8000/itemm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, quantity })
    });
    if (!response.ok) {
        throw new Error('Failed to create item');
    }
  };