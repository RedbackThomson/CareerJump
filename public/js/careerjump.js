$(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $('.user-badge, .company-badge').each(function() {
    var colour = $(this).attr('badge-colour');
    $(this).css('background-color', '#' + colour);
  });
});
