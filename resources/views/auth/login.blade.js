class Login {
    send(e) {

        e.preventDefault()
        e.stopPropagation()

        if (validateForm(e)) {

            const $form = $(e.target);
            const arrayForm = new URLSearchParams(new FormData($form[0]));

            $.ajax({
                url: "/login",
                type:"POST",
                data: arrayForm,
                dataType: 'json',
                processData: false,
                success: (data) => {
                    console.log(data)
                    if (data.auth) {
                        location.reload();
                    } else {
                        $('#user, #password').addClass('is-invalid').parent()
                        .append(`<span class="error invalid-feedback">El usuario o contraseña son incorrectos</span>`);
                    }
                },
                error: (err) => {
                    console.log(err)
                }
            })
        }

        return false;
    }
}

const login = new Login()