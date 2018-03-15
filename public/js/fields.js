$(function() {
  $('.form__tags').tagsInput({
    'autocomplete_url': '/api/profile/tags',
    'defaultText': '',
    height: '',
    width: ''
  });
  $('.tagsinput input').addClass('form__text');
});
