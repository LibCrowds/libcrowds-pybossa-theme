module.exports = function(grunt) {

  grunt.initConfig({
    qunit: {
      all: ['tests/index.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'pybossa.js', 'tests/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('dev', ['watch', 'jshint', 'qunit']);
};
