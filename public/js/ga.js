window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-113706257-1');

$(".js-signup").click(function() {
  gtag('event', 'registration_modal_open', {
    'event_category': 'Registration',
    'event_label': 'Opened the Modal'
  });
});

$(".js-submit").click(function() {
  gtag('event', 'registration_top_register', {
    'event_category': 'Registration',
    'event_label': 'Registered using the Top Form'
  });
});

$(".js-submit-bottom").click(function() {
  gtag('event', 'registration_bottom_register', {
    'event_category': 'Registration',
    'event_label': 'Registered using the Bottom Form'
  });
});

$(".js-hiring").click(function() {
  gtag('event', 'email_hiring', {
    'event_category': 'Email',
    'event_label': 'Opened a Hiring Email'
  });
});

$(".js-contact").click(function() {
  gtag('event', 'email_contact', {
    'event_category': 'Email',
    'event_label': 'Opened a Contact Email'
  });
});

$(".js-faq").click(function() {
  gtag('event', 'faq_click', {
    'event_category': 'FAQ',
    'event_label': 'Clicked on FAQ - ' + $(this).attr('for')
  });
});