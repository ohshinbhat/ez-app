export default class UserService {
    static BASE_URL = "http://localhost:9898/api";

    static async login(email, password) {
        try {
            let response = await fetch(`${UserService.BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
               // console.log(response.text)
                // If the response is not ok, throw an error with the message from the response
                let errorData = await response.text();
                return errorData;
                // throw new Error(errorData);
            }

            // Parse the JSON data when the response is successful
            let data = await response.json();
            console.log('Success:', data);
            return data;
        } catch (error) {
            console.error('Error:', error); // This will print the error message
        }
    }
    static async loginValidate(email,otp){
      try {
        const response = await fetch(`${UserService.BASE_URL}/login/validate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp }),
        });
  
        if (!response.ok) {
          const message = await response.text();
          console.log(message)
          return false;
          // throw new Error("Error : "+message);
          
        }
        else{
            console.log(response.text());
            return true;
        }
  
        // Navigate to success page after OTP verification
      } catch (err) {
        console.error(err.message || 'OTP verification failed!');
      }
    }
    static async register(name,email,mobileNumber,password){
        const response = await fetch(`${UserService.BASE_URL}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name":name,
                "email":email,
                "mobileNumber":mobileNumber,
                "password":password
            }),
          });
    
          if (!response.ok) {
            const message = await response.text();
            throw new Error(message);
          }
    
          const data = await response.json();
         
          console.log(data);
        } catch (error) {
            console.error('Error:', error.message); // This will print the error message
        }
        
    static async OtpValidate(email,otp){
        try {
            const response = await fetch(`${UserService.BASE_URL}/register/validate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, otp }),
            });
      
            if (!response.ok) {
              const message = await response.text();
              return false
              // throw new Error("Error : "+message);
              
            }
            else{
                console.log(response.text());
                return true;
            }
      
            // Navigate to success page after OTP verification
          } catch (err) {
            console.error(err.message || 'OTP verification failed!');
          }
        };
      
}
