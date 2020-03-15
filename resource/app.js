// This is the starting value for the editor
// We will use this to seed the initial editor 
// and to provide a "Restore to Default" button.
repoUrl="";

var starting_value;
var editor;

$.getJSON( repoUrl+"/resource/dataset.json", function( data ) 
{
  starting_value = data;
  // Initialize the editor
  editor = new JSONEditor(document.getElementById('editor_holder'), {
    // Enable fetching schemas via ajax
    ajax: true,
    theme: 'bootstrap4',
    // The schema for the editor
    schema: {
      type: "array",
      title: "People",
      format: "tabs",
      items: {
        title: "Person",
        headerTemplate: "{{i}} - {{self.name}}",
        oneOf: [
          {
            $ref: "resource/basic_person.json",
            title: "Basic Person"
          },
          {
            $ref: "resource/person.json",
            title: "Complex Person"
          }
        ]
      }
    },

    // Seed the form with a starting value
    startval: starting_value,

    // Disable additional properties
    no_additional_properties: true,

    // Require all properties by default
    required_by_default: true
  });
  // Hook up the validation indicator to update its 
  // status whenever the editor changes
  editor.on('change', function () {
    // Get an array of errors from the validator
    var errors = editor.validate();

    var indicator = document.getElementById('valid_indicator');

    // Not valid
    if (errors.length) {
      indicator.style.color = 'red';
      indicator.textContent = "not valid";
    }
    // Valid
    else {
      indicator.style.color = 'green';
      indicator.textContent = "valid";
    }
  });
});




// Hook up the Restore to Default button
document.getElementById('restore').addEventListener('click', function () {
  editor.setValue(starting_value);
});

document.getElementById('submit').addEventListener('click', updateData)

// Hook up the enable/disable button
document.getElementById('enable_disable').addEventListener('click', function () {
  // Enable form
  if (!editor.isEnabled()) {
    editor.enable();
  }
  // Disable form
  else {
    editor.disable();
  }
});

OAuth.initialize("1I8RB4EJobWL3PLZzFku9K-_uUc");

function updateData(){
  starting_value = editor.getValue();
  OAuth.popup('github')
    .done(function(result) {
      console.log(result)
    //use result.access_token in your API request 
    //or use result.get|post|put|del|patch|me methods (see below)
    })
    .fail(function (err) {
    //handle error with err
    });
}