Hello {{ user['fullname'] }},

Thank you for creating an account at {{ config.BRAND }}.

To verify that you are the owner of this e-mail address, please visit the URL below:

If you did not request this verification, please ignore this email.

[Click here to confirm your e-mail address and create your account][confirm]

[confirm]: {{ confirm_url }}

Regards,

{{ config.BRAND }} Team

