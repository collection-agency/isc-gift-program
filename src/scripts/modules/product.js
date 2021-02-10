const product = {
  init: () => {
    console.log($('.fill-hidden').length);
    if ($('.multi-input').length) {
      product.bindMulti();
    }
  },
  bindMulti: () => {
    $('.multi-input').change(function() {
      const hiddenId = $(this).attr('data-hiddenid');
      const $hiddenField = $(`.multi-hidden#${hiddenId}`);
      const $checkboxes = $(`[data-hiddenid="${hiddenId}"]`);
      $hiddenField.val('');
      $checkboxes.each(function() {
        if ($(this)[0].checked) {
          if ($hiddenField.val() === '') {
            $hiddenField.val($(this).val());
          } else {
            $hiddenField.val($hiddenField.val() + ", " + $(this).val());
          }
        }
      });
      console.log($hiddenField.val());
    })
  }
};
export default product;
