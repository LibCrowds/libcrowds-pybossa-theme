libcrowds-pybossa-theme
***********************

A `PyBossa`_ theme for the `LibCrowds`_ crowdsourcing platform.


Installation
============

Clone this repository into your `PyBossa themes`_ folder and add the following
setting to your main PyBossa configuration file:

.. code-block:: python

    THEME = {your-custom-theme}


Features
========

The theme incorporates all features introduced up to and including `PyBossa v1.4.0`_
and the theme's functionality is best understood alongside the PyBossa code. The
following sections contain a few more details about some of the more unique features:


.. _plugins:

Plugins
-------

The theme supports a number of optional plugins. Any additional functionality or
views provided by these plugins are encapsulated within the plugins themselves.
If installed, the plugins are integrated as follows:

* `libcrowds-statistics`_: The **Statistics** link on the main navigation bar will now
  point to an updated global statistics page.

* `pybossa-analyst`_: A **Rules** link will appear on project settings pages.

* `pybossa-gravatar`_: An **Import Gravatar** button will appear on user settings pages.

The functionality of each plugin is otherwise described in the documentation associated
with that plugin.


Category themes
---------------

Each project has a main portal page located at:

.. code-block:: http

    /project/short_name/


There are a few simple configuration options that can be used to quickly customise
each category of project:

* **Splash images:** Place a JPEG file in the folder `static/img/splash`_ with a
  filename in the format *category_{category_id}*.

* **Tutorial video:** Place an MP4 file in the folder `static/video`_ with a
  filename in the format *category_{category_id}*.

* **Attributions:** If the splash image requires an attribution it can be added
  in `js/portal.js`_.

The category ID mentioned above can be retrieved via the API:

.. code-block:: http

    GET http://www.libcrowds.com/api/category


.. note::

    See the 'Convert-a-Card' category for an example of these customisation
    settings being applied.


Staff
-----

Both administrators and users with a British Library email address have access to
the pages for creating and opening projects. This means that staff can create,
modify and otherwise take ownership of projects without requiring access to the
full range of admin features.

.. note::

    For this restriction to be at all effective email account confirmation should
    always remain enabled in the main PyBossa configuration file.


.. _PyBossa: https://github.com/PyBossa/pybossa
.. _PyBossa themes: https://github.com/PyBossa/pybossa/tree/master/pybossa/themes
.. _PyBossa v1.4.0: https://github.com/PyBossa/pybossa/releases/tag/v1.4.0

.. _LibCrowds: http://www.libcrowds.com
.. _static/img/splash: https://github.com/LibCrowds/libcrowds-pybossa-theme/tree/master/static/img/splash
.. _static/video: https://github.com/LibCrowds/libcrowds-pybossa-theme/tree/master/static/video
.. _js/portal.js: https://github.com/LibCrowds/libcrowds-pybossa-theme/tree/master/static/js/portal.js

.. _pybossa-gravatar: https://github.com/alexandermendes/pybossa-gravatar
.. _libcrowds-statistics: https://github.com/LibCrowds/libcrowds-statistics
.. _pybossa-analyst: https://github.com/alexandermendes/pybossa-analyst