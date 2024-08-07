// auth.jsx
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null; // Check if the token exists
};

export const login = async (email, password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); // Store the token in localStorage
            return true; // Return true for successful login
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message); // Handle errors
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error; // Propagate the error for handling in the component
    }
};

export const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
};

export const getToken = () => {
    return localStorage.getItem('token'); // Get the token
};
