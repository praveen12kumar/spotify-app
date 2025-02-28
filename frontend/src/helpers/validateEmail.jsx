export const validateEmail = (email)=> {
    // Regular expression to validate email format
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    return emailRegex.test(email);
  };
  

// Examples
// console.log(validateEmail("test@example.com")); // true
// console.log(validateEmail("user.name+tag@sub.domain.org")); // true
// console.log(validateEmail("invalid-email")); // false (missing @ and domain)
// console.log(validateEmail("test@domain")); // false (missing top-level domain like .com)
// console.log(validateEmail("test@.com")); // false (domain name is missing)
