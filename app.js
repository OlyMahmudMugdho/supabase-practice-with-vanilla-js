
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkZmNibXhjcnl0dmxrbGxneG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU3OTAwMDksImV4cCI6MTk5MTM2NjAwOX0.v1DljysKiC4u-D56Tf5FRO5aZKA3nr1mS-CsTqjp-k0';

const SUPABASE_URL = "https://jdfcbmxcrytvlkllgxos.supabase.co"

const datb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let is_logged_in = false;

const signup = async () => {
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    let { data, error } = await datb.auth.signUp({
        email: email,
        password: password
    })
}

const login = async () => {
    let email = document.querySelector("#email2").value;
    let password = document.querySelector("#password2").value;


    let { data, error } = await datb.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (error) {
        let error_msg = document.querySelector(".error");
        error_msg.style.display = "initial";
        console.log(error);
    }
    else {
        is_logged_in = true;
        let success = document.querySelector(".success");
        success.style.display = "initial"
    }
}

const check = async () => {
    let auth_sect = document.querySelector(".is_authenticated");
    let not_authenticated_sect = document.querySelector(".not_authenticated");
    const info = await datb.auth.getUser();
    if (info.data.user) {
        is_logged_in = true;
        not_authenticated_sect.style.display = "none";
        auth_sect.style.display = "initial";
        return true;
    }
    else {
        is_logged_in = false
        auth_sect.style.display = "none";
        not_authenticated_sect.style.display = "initial";
        return false;
    }
    console.log(await info.data.user);
}

const logout = async () => {
    let { error } = await datb.auth.signOut()
    if(!error){
        is_logged_in = false
    }
    console.log(error);
}

const read_posts = async () => {
        let { data: blog_posts, error } = await datb
        .from('blog_posts')
        .select('*')
        console.log(await blog_posts);
}





const write_post = async () => {
    let post_title = document.querySelector(".title").value;
    let post_body = document.querySelector(".body").value;
    const post_author = await datb.auth.getUser();
    console.log(post_author.data.user.email);
    const { data, error } = await datb
        .from('blog_posts')
        .insert([
            {
                title: post_title,
                body: post_body,
                author: post_author.data.user.email
            },
        ])
        read_posts();

}

read_posts();