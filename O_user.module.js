class O_user{
    constructor(
        n_id, 
        s_name,
        s_email,
        s_password_hashed_sha256
    ){
        this.n_id = n_id
        this.s_name = s_name
        this.s_email = s_email
        this.s_password_hashed_sha256 = s_password_hashed_sha256
        this.b_email_confirmed = false
    }
}