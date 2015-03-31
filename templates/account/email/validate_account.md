Hello {{ user['fullname'] }},

Thank you for signing up at {{ config.BRAND }}.

To verify that you are the owner of this e-mail address, please visit the URL below:

[Click here to confirm your e-mail address and create your account][confirm]

If you did not request this verification, please ignore this email.

[confirm]: {{ confirm_url }}

Best wishes,

{{ config.BRAND }} Team

