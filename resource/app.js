// import GitHub from 'github-api';
// This is the starting value for the editor
// We will use this to seed the initial editor 
// and to provide a "Restore to Default" button.
repoUrl="";
owner="jr638091"
repo='jr638091.github.io'

var editor;
var dataset_info;

$.getJSON( `http://api.github.com/repos/${owner}/${repo}/contents/resource/dataset.json`, function( data ) 
{
  dataset_info = data;
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
    startval: JSON.parse(atob(data.content)),

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

OAuth.initialize('PVanBGV_sJB6pLh88oFohbI7CUQ')
var access_token;
   
function updateData(){
  var saveData = editor.getValue();
  OAuth.popup('github').done(function(result) {
    access_token = result.access_token;
    var myJSON = JSON.stringify(saveData);
    console.log(myJSON)
    var encodedString = btoa(myJSON);
    console.log(encodedString)
    q = $.ajax({method:'PUT', 
    url:`http://api.github.com/repos/${owner}/${repo}/contents/resource/dataset.json`,
    xhrFields: {
      withCredentials: true
    },
    headers:{
      Authorization: `${access_token} OAUTH-TOKEN`
    },
    data:{
      content:encodedString,
      message:`${repo} by ${owner} at ${Date.now()}`,
      sha:dataset_info.content
    }
    })
  });
}