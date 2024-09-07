export default class ProfileService {
    static BASE_URL = "http://localhost:9898/api";

    // Method to view the user's profile based on their email
    static async viewProfile(email) {
        try {
            const response = await fetch(`${ProfileService.BASE_URL}/profile/view`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            const data = await response.json();
            console.log('Profile Data:', data);
            return data;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    // Method to request profile edit by updating the user's email
    static async editProfile(email, newEmail) {
        try {
            const response = await fetch(`${ProfileService.BASE_URL}/profile/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newEmail }),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message);
            }

            const message = await response.text();
            console.log('Edit Profile Response:', message);
            return message;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

  
    static async editProfileValidate(newEmail, otp) {
             try {
                 const response = await fetch(`${ProfileService.BASE_URL}/profile/edit/validate/${newEmail}`, {
                     method: 'PUT',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                        newEmail,
                        otp
                       
                    }),
                });
    
                if (!response.ok) {
                    const message = await response.text();
                    console.error('Error:', message);
                    return false; // Return false if validation fails
                } else {
                    const successMessage = await response.text();
                    console.log('Edit Profile Validation Response:', successMessage);
                    return true; // Return true if validation succeeds
                }
    
            } catch (error) {
                console.error('Error:', error.message || 'Profile update validation failed!');
                return false; // Return false in case of an exception
            }
        }
    
}

