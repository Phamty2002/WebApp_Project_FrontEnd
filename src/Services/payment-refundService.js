// payment-refundService.js
export const processRefund = async (orderId) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL; // Ensure you have your backend URL in your environment variables
    const endpoint = `${backendUrl}/api/payment/refund`; // Adjust the endpoint as per your actual API route

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers your API requires, like authorization tokens
            },
            body: JSON.stringify({ orderId })
        });

        if (!response.ok) {
            // Handle any errors returned from the server
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to process the refund');
        }

        return await response.json(); // Or just return a success message
    } catch (error) {
        // Handle any exceptions during the request
        console.error('Error processing refund:', error);
        throw error;
    }
};
