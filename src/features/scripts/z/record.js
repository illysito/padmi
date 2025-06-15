function record() {
  const stream = renderer.domElement.captureStream(60) // 60 FPS
  const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' })
  let recordedChunks = []

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) recordedChunks.push(e.data)
  }

  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, { type: 'video/webm' })
    const url = URL.createObjectURL(blob)

    // Download the video
    const a = document.createElement('a')
    a.href = url
    a.download = 'torus-animation.webm'
    a.click()
  }
}

export default record
