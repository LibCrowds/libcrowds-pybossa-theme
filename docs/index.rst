libcrowds-pybossa-theme
***********************

A `PyBossa`_ theme for the `LibCrowds`_ crowdsourcing platform.


Installation
============

Clone this repository into your `PyBossa themes`_ folder then add the following
setting to your PyBossa configuration file:

.. code-block:: python

    THEME = {your-custom-theme}


Features
========

The theme's functionality is best understood alongside the `PyBossa`_ backend, which
provides all of the relevant back end processing. The theme currently incorporates all
functionality introduced up until `PyBossa v1.4.0`_. Any additional views or functionality
required by the `plugins` mentioned below are provided within the plugins themeselves.


.. _plugins:

Plugins
=======

The theme supports a number of optional plugins, if installed these are integrated
as follows:

* `pybossa-gravatar`_: An **Import Gravatar** button will appear on user settings pages.

* `libcrowds-statistics`_: The **Statistics** link on the main navigation bar will now
  point to the updated statistics page.


Category themes
===============

Each project has a main page that acts as a portal to that project, which can
be located at:

.. code-block:: http

    /project/short_name/


The category for each project can be customised so that each project in that
category has a unique appearance. The category short name mentioned in the
customisation options below can be retrieved via the API:

``` http
GET http://www.libcrowds.com/api/category
```

Customisation options can be set as follows:

* Splash images: Place a JPEG file in the folder `static/img/splash`_ with a
  filename matching the category short name.

* Tutorial video: Place an MP4 file in the folder `static/video`_ with a
  filename matching the category short name.


.. note::

    See the 'Convert-a-Card' category for an example of these customisation
    options being applied.



.. _PyBossa: https://github.com/PyBossa/pybossa
.. _PyBossa themes: https://github.com/PyBossa/pybossa/tree/master/pybossa/themes
.. _PyBossa v1.4.0: https://github.com/PyBossa/pybossa/releases/tag/v1.4.0

.. _LibCrowds: http://www.libcrowds.com
.. _static/img/splash: https://github.com/LibCrowds/libcrowds-pybossa-theme/tree/master/static/img/splash

.. _pybossa-gravatar: https://github.com/alexandermendes/pybossa-gravatar
.. _libcrowds-statistics: https://github.com/LibCrowds/libcrowds-statistics