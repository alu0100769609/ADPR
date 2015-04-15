document.getElementById('files').addEventListener('change', CopyMe, false);

var dropZone = document.getElementById('INPUT');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

function CopyMe(evt) {
    var file = evt.target.files[0];
    if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                      INPUT.innerHTML = e.target.result;
                    }
            var c = reader.readAsText(file);
        }
    else { alert("Failed to load file"); }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "purple";
}

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files; // FileList object.

  document.getElementById('INPUT').value = "";

  for (var i = 0, f; f = files[i]; i++) {
    var reader = new FileReader();
    reader.readAsText(f);
    reader.onload = function(e){
      var txt = document.getElementById('INPUT').value;
      if (txt != ""){
          txt = txt + "\n";
      }
      txt = txt + e.target.result;
      document.getElementById('INPUT').value = txt;
    }
  }
  evt.target.style.background = "white";
}

function dump(fileName) {
    $.get(fileName, function (data) {
        $("#INPUT").load(data);
    });
};
