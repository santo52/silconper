export class Login {
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
                beforeSend: () => $.preloader().show(),
                success: (data) => {
                    if (data.auth) {
                        location.reload();
                    } else {
                        $.preloader().hide()
                        $('.invalid-feedback').remove();
                        $('#user, #password').addClass('is-invalid').parent()
                        .append(`<span class="error invalid-feedback">${data.message}</span>`);
                    }
                },
                error: (err) => {
                    $.preloader().hide()
                    console.log(err)
                }
            })
        }

        return false;
    }
}