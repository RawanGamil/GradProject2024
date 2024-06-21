// Select the necessary DOM elements
const startRecordButton = document.querySelector(".start-record");
const audioChunks = [];

// Function to handle recording start
function startRecording() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      // Event handler for dataavailable event
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      // Event handler for stop event
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.controls = true;
        document.body.appendChild(audio);

        // Download the recorded audio
        const link = document.createElement("a");
        link.href = audioUrl;
        link.download = "recorded_audio.wav";
        document.body.appendChild(link);
        link.click();

        // Reset the audioChunks array for future recordings
        audioChunks.length = 0;
      });

      // Start recording
      mediaRecorder.start();
      startRecordButton.textContent = "Stop Recording";

      // Event listener to stop recording when button is clicked again
      startRecordButton.addEventListener("click", () => {
        mediaRecorder.stop();
        startRecordButton.textContent = "Start Recording";
      });
    })
    .catch((err) => {
      console.error("Error accessing microphone:", err);
    });
}

// Event listener for recording button click
startRecordButton.addEventListener("click", () => {
  startRecording();
});
