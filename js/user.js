//the user datatype for user data
class User {
    constructor (id, username, email, birthday, password) {
        this.userId = id;
        this.username = username;
        this.email = email;
        this.birthday = birthday;
        this.password = password;
    }

    //getters
    getId(){
        return this.userId;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getBirthday() {
        return this.birthday;
    }

    //setters
    setUsername(username) {
        this.username = username;
    }

    setPassword(password) {
        this.password = password;
    }

    setEmail(email) {
        this.email = email;
    }

    setBirthday(birthday) {
        this.birthday = birthday;
    }
    
}