'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var extend = require('deep-extend');
module.exports = Generator.extend({
  
  prompting: function () {

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('generator-onekey-h5') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'your project name',
      default: 'project1'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('**/**'),
      this.destinationPath(this.props.name+'/')
    );
    var pkg = this.fs.readJSON(this.destinationPath(this.props.name+'/package.json'), {});
    pkg.name = this.props.name;
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('webkong');

    this.fs.writeJSON(this.destinationPath(this.props.name+'/package.json'), pkg);
    
  },
  end:function(){
    this.log('create successfully!')
  }

});
