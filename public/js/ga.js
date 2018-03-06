window.dataLayer = window.dataLayer || [];
function gtag(){
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'UA-113706257-1');

$('.js-signup').click(function() {
  gtag('event', 'application_nav', {
    'event_category': 'Application',
    'event_label': 'Clicked the Nav Apply Button'
  });
});

$('.js-submit').click(function() {
  gtag('event', 'application_hero', {
    'event_category': 'Application',
    'event_label': 'Clicked the Hero Apply Button'
  });
});

$('.js-submit-bottom').click(function() {
  gtag('event', 'application_footer', {
    'event_category': 'Application',
    'event_label': 'Clicked the Footer Apply Button'
  });
});

$('.js-hiring').click(function() {
  gtag('event', 'email_hiring', {
    'event_category': 'Email',
    'event_label': 'Opened a Hiring Email'
  });
});

$('.js-contact').click(function() {
  gtag('event', 'email_contact', {
    'event_category': 'Email',
    'event_label': 'Opened a Contact Email'
  });
});

$('.js-faq').click(function() {
  gtag('event', 'faq_click', {
    'event_category': 'FAQ',
    'event_label': 'Clicked on FAQ - ' + $(this).attr('for')
  });
});
