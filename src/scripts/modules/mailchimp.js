const mailchimp = {
  init: () => {
    const $form = $('.mailchimp-form');
    const formAction = $form.attr('action');
    console.log(formAction)

    if (formAction === undefined || formAction === '') {
      // Remove form
      $('#mailchimp').remove();
      console.error('mailchimp action empty');
    } else {
      // Bind form submit event
      $form.submit(mailchimp.submitForm);
    }
  },

  submitForm: (e) => {
    const $form = $('.mailchimp-form');

    let data = {};

    // Get form data
    const dataArray = $form.serializeArray();

    // Create data object from form data
    $.each(dataArray, function (index, item) {
      data[item.name] = item.value;
    });

    mailchimp.handleMailchimpAjax(data, mailchimp.successMessage);

    // Prevent default submit functionality
    return false;
  },

  handleMailchimpAjax: (data, successCallback) => {
    // Rewrite action URL for JSONP
    const $form = $('.mailchimp-form');
    const formAction = $form.attr('action');
    const url = formAction.replace('/post?', '/post-json?').concat('&c=?');

    // Ajax post to Mailchimp API
    $.ajax({
      url: url,
      data: data,
      success: successCallback,
      dataType: 'jsonp',
      error: function (resp, text) {
        console.log('mailchimp ajax submit error: ' + text);
      }
    });
  },

  /**
  * Handle response message
  */
  successMessage: (response) => {
    let msg = '';
    let successMsg = 'You\'ve been successfully subscribed';

    const $email = $('.mailchimp-email');
    const $response = $('.mailchimp-response');

    if (response.result === 'success') {

      // Success message
      msg = successMsg;

      // Set class .valid on form elements
      $response.removeClass('error').addClass('valid');
      $email.removeClass('error').addClass('valid');

      $email.val('').blur();

    } else {
      // Set class .error on form elements
      $email.removeClass('valid').addClass('error');
      $response.removeClass('valid').addClass('error');

      // Make error message from API response
      let index = -1;

      try {
        let parts = response.msg.split(' - ', 2);

        if (parts[1] === undefined) {
          msg = response.msg;
        } else {
          let i = parseInt(parts[0], 10);

          if (i.toString() === parts[0]) {
            index = parts[0];
            msg = parts[1];
          } else {
            index = -1;
            msg = response.msg;
          }
        }
      }
      catch (e) {
        index = -1;
        msg = response.msg;
      }

      if (msg === 'An email address must contain a single @') {
        msg = 'Your email is missing the @';
      } else if (msg === 'The domain portion of the email address is invalid (the portion after the @: )') {
        msg = 'Your email\'s domain doesn\'t look right';
      } else if (msg === 'This email cannot be added to this list. Please enter a different email address.') {
        msg = 'Please use a different email';
      }
    }

    if (mailchimp.alreadySubscribed(response.msg)) {

      msg = successMsg;

      // Set class .valid on form elements
      $response.removeClass('error').addClass('valid');
      $email.removeClass('error').addClass('valid');

      $email.val('').blur();
    }

    // Show message
    $response.html(msg);
  },

  alreadySubscribed: (msg) => {
    let substring = "already subscribed";
    return msg.indexOf(substring) !== -1;
  }
}

export default mailchimp;
