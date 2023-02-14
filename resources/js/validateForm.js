  function validateNumeric($form) {
    var numericFields = $form.find('.form-control.numeric, .form-control.money').toArray();
    var completed = true;
    numericFields.map(function (item) {
      var value = $(item).val();
  
      if (isNaN(value)) {
        if (completed) {
          $(item).focus();
          completed = false;
        }
  
        var message = $(item).hasClass('money') ? 'Debe ser un valor monetario válido.' : 'No es un número válido.';
        $(item).addClass('is-invalid').parent().append(`<span class="error invalid-feedback">${message}</span>`);
      }
    });
    return completed;
  }
  
  function validateRequired($form) {
    var requiredFields = $form.find('select.required, input.required, textarea.required').toArray();
    var completed = true;
    requiredFields.map(function (item) {
      var value = $(item).val();
  
      if (!value || !value.trim()) {
        if (completed) {
          $(item).focus();
          completed = false;
        }
  
        const message = 'Este campo es obligatorio.';
        $(item).addClass('is-invalid').parent().append(`<span class="error invalid-feedback">${message}</span>`);
      }
    });
    return completed;
  }

  export function validateForm(e) {
    e.preventDefault();
    e.stopPropagation();
    var $form = $(e.target);
    $form.find('.is-invalid').removeClass('is-invalid');
    $form.find('.invalid-feedback').remove();
    var required = validateRequired($form);
  
    if (required) {
      var numeric = validateNumeric($form);
      return numeric;
    }
  
    return required;
  }