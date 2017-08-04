# libcrowds-pybossa-theme

A [Pybossa](https://github.com/PyBossa/pybossa) theme for the [LibCrowds](http://www.libcrowds.com) crowdsourcing platform.

**:warning: DEPRECATED: Replaced by [vue-pybossa-frontend](https://github.com/LibCrowds/vue-pybossa-frontend)**


## Installation

Clone this repository into your PyBossa [themes](https://github.com/PyBossa/pybossa/tree/master/pybossa/themes)
folder and add the following setting to your PyBossa configuration file:

```Python
THEME = {your-custom-theme}
```

## Plugins

The theme integrates with a number of optional plugins, a list of which can be
seen on the [About](https://www.libcrowds.com/about) page.


## Project themes

Project portal pages are configured using keys from a project's info field, the
currently supported keys are:

- **splash:** A link to an image URL.
- **splash_attribution:** Any attribution required for the above splash image.
- **tutorial_video:** Code to embed a tutorial video (e.g. from Flickr).

For an example of these keys see
[project-convert-a-card/project.json](https://github.com/LibCrowds/project-convert-a-card/blob/master/project.json).


## Staff

Both administrators and users with a British Library email address have access
to the pages for creating and managing projects. This means that staff can
create, modify and otherwise take ownership of projects without requiring
access to the full range of admin features. For this restriction to be at all
effective email account confirmation should always remain enabled in the main
PyBossa configuration file.


## Contributing

See the [CONTRIBUTING](CONTRIBUTING.md) file for guidelines on how to suggest improvements,
report bugs or submit pull requests.
