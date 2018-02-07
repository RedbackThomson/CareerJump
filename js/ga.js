window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-113706257-1');

$(".js-signup").click(function() {
  ga('send', 'event', 'Registration', 'Opened Modal')
});

$(".js-submit").click(function() {
  ga('send', 'event', 'Registration', 'Submitted Hero Form')
});

$(".js-submit-bottom").click(function() {
  ga('send', 'event', 'Registration', 'Submitted Bottom Form')
});

$(".js-hiring").click(function() {
  ga('send', 'event', 'Email', 'Started Hiring Email')
});

$(".js-contact").click(function() {
  ga('send', 'event', 'Email', 'Started Contact Email')
});

$(".js-faq").click(function() {
  ga('send', 'event', 'FAQ', $(this).attr('for'));
});