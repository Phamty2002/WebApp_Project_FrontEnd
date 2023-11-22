const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const processPayment = async (paymentData) => {
    try {
        const response = await fetch(`${backendUrl}/api/payment/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        });

        // Handle non-200 responses by returning the response body if possible
        if (!response.ok) {
            const errorBody = await response.text(); // Try to read the text first
            try {
                const jsonError = JSON.parse(errorBody); // Then attempt to parse it as JSON
                throw new Error(jsonError.error || 'Network response was not ok');
            } catch {
                throw new Error(errorBody || 'Network response was not ok');
            }
        }

        return await response.json(); // Or handle the response as needed
    } catch (error) {
        console.error('Error during the fetch:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};
