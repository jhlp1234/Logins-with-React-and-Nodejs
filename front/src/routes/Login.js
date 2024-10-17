function Form(props){
    return(
        <form onSubmit={function(event){
            event.preventDefault();
            let name = document.getElementById("name").value;
            let password = document.getElementById("password").value;
            props.submits(name, password);
        }}>
            <p><input type="text" name="name" placeholder="Name" id="name" required/></p>
            <p><input type="password" name="password" placeholder="Password" id="password" required/></p>
            <p><input type="submit" value="제출하긔"/></p>
        </form>
    )
}

function Login(){
    return(
        <div>
            <h1>Login</h1>
            <Form submits={function(name, password){
                fetch("http://localhost:5000/login", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: name,
                        password: password
                    })
                })
                .then(function(res){
                    return res.json();
                })
                .then(function(data){
                    if(data.success){
                        window.location.replace("/");
                    }
                })
            }}></Form>
        </div>
    )
}

export default Login;