// const scriptURL = 'https://script.google.com/macros/s/AKfycbzr8sURk0r1GhyrlSV07voMrW_yMkGxZCxqlej2O2o/dev'

// const form = document.forms['contact-form']

// form.addEventListener('submit', e => {
  
//   e.preventDefault()
  
//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//   .then(response => alert("Thank you! Form is submitted" ))
//   .then(() => { window.location.reload(); })
//   .catch(error => console.error('Error!', error.message))
// })

var iframe = document.getElementById('sketchfab-embed');
var client = new Sketchfab('1.12.1', iframe);

client.init('YOUR_MODEL_UID', {
    success: function(api) {
        api.start();
        api.addEventListener('viewerready', function() {
            console.log('Sketchfab Viewer is Ready!');
        });
    },
    error: function() {
        console.error('Sketchfab API Error');
    }
});
