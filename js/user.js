class User {
    constructor (id, fName, lName, email, username, password) {
        this.userId = id;
        this.firstName = fName;
        this.lastName = lName;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    //getters
    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    //setters
    setFirstName(name) {
        this.firstName = name;
    }

    setLastName(name) {
        this.lastName = name;
    }

    setUsername() {
        this.username = username;
    }

    setPassword() {
        this.password = password;
    }
    
}

const user = new User(12345, "Joe", "Mama", "joemama333");
console.log( user.getFirstName() );