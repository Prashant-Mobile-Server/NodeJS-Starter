class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getSelfLink() {
        return `/api/users/${this.id}`;
    }

    getHobbiesLink() {
        return `/api/users/${this.id}/hobbies`;
    }
}

export default User;