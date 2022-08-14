function readFile(file) {
  const reader = new FileReader();
  const shows = document.getElementById("result");
  reader.addEventListener("load", (event) => {
    event.preventDefault();
    const result = event.target.result;
    // Do something with result
    // console.log(result);
    const obj = JSON.parse(result);
    console.log(obj);
    const data = obj.data;
    const ayahs = data.ayahs.count;
    const surahObj = data.surahs;
    const surah = surahObj.count;
    const surahRef = surahObj.references;
    shows.innerHTML = `<b>Surah List</b>`;

    var sql = '';

    surahRef.forEach((surah) => {
    //   shows.innerHTML += `
    //         <br />
    //         <ul style="disc">
    //             <li>No. ${surah.number}</li>
    //             <li>Name: ${surah.name}</li>
    //             <li>English Name: ${surah.englishName}</li>
    //             <li>English Translated Name: ${surah.englishNameTranslation}</li>
    //             <li>Number of Ayahs: ${surah.numberOfAyahs}</li>
    //             <li>RevelationType: ${surah.revelationType}</li>
    //         </ul>
    //         <br />
    //         `;
            sql += `INSERT INTO \`surah_info\` (\`no\`, \`name\`, \`english_name\`, \`english_translated_name\`, \`total_ayahs\`, \`revelation_type\`) VALUES ("${surah.number}", "${surah.name}", "${surah.englishName}", "${surah.englishNameTranslation}", "${surah.numberOfAyahs}", "${surah.revelationType}");`;
            sql += "\n\n";
    });
    shows.innerHTML = `<pre>${sql}</pre>`;
    // shows.innerText = `${ayahs} ayahs in ${surah} surahs`;
  });

  reader.addEventListener("progress", (event) => {
    if (event.loaded && event.total) {
      const percent = (event.loaded / event.total) * 100;
      console.log(`Progress: ${Math.round(percent)}`);
    }
  });
  //reader.readAsDataURL(file);
  reader.readAsText(file);
}

const fileSelector = document.getElementById("file-selector");
fileSelector.addEventListener("change", (event) => {
  const fileList = event.target.files;
  //console.log(fileList);
  for (let i = 0; i < fileList.length; i++) {
    readFile(fileList[i]);
  }
});

const dropArea = document.getElementById("drop-area");

dropArea.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = "copy";
});

dropArea.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const fileList = event.dataTransfer.files;
  dropArea.innerText = fileList[0].name;
  readFile(fileList[0]);
});


/* 
Table: surah_info copy the below code to create table

CREATE TABLE `quran`.`surah_info` ( `no` INT NOT NULL , `name` VARCHAR(50) NOT NULL , `english_name` VARCHAR(50) NOT NULL , `english_translated_name` VARCHAR(50) NOT NULL , `total_ayahs` INT NOT NULL , `revelation_type` VARCHAR(20) NOT NULL ) ENGINE = InnoDB;
*/
