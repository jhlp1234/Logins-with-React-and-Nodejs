function Form(props){
    return (
        <div>
            <form onSubmit={function(event){
                event.preventDefault();
                let name = document.getElementById("name").value;
                let password = document.getElementById("password").value;
                props.submits(name, password);
            }}>
            <p><input type="text" placeholder="Name" name="name" id="name" required/></p>
            <p><input type="password" placeholder="Password" name="password" id="password" required/></p>
            <p><input type="submit" value="제출"/></p>
            </form>
        </div>
    )
}

function Regist(){

    return(
        <div>
            <Form submits={function(name, password){
                fetch("http://localhost:5000/regist", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        password: password
                    }),
                })
                .then(() => {
                    window.location.replace("/");
                })
            }}></Form>
        </div>
    )
}

export default Regist;