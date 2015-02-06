module.exports = function(grunt) {
 
    //2. Project configuration.
    grunt.initConfig({

        
        //define what to do with the SASS process
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'compressed'
                },
                files: [{
                    src: ['sass/theme.scss'],
                    dest: 'css/theme.css',
                    ext: '.css'
                }]
            }
        },
        watch: {
              css: {
                files: 'sass/*',
                tasks: ['sass']
              }
        }
        
    });
 
    //1. load task libraries for use
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
 
    //3. register a named task ( 'process' ) that runs Grunt processes ( 'imagemin', 'concat' )
    grunt.registerTask( 'process', [ 'sass' ] );
};