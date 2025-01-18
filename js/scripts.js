const plt_img = document.getElementById("pltImg");
const video = document.getElementById("simVideo");
const video_sq = document.getElementById("simVideoSquare");
const dark_overlay = document.getElementById("darkOverlay");
const img_container = document.getElementById("imgContainer");

img_container.addEventListener("click", (e) => {
    // 画像の位置とサイズを取得
    const rect = plt_img.getBoundingClientRect();   
    const clickX = e.clientX - rect.left; // クリックした位置のX座標
    const imageWidth = rect.width;        // 画像の幅
    const videoDuration = video.duration; // 動画の長さ

    // クリック位置を動画の時間にマッピング
    const newTime = (clickX / imageWidth) * videoDuration;
    video.currentTime = newTime; // 動画の再生位置を設定
    video_sq.currentTime = newTime
});

// 動画の進行に合わせてオーバーレイの幅を調整
video.addEventListener('timeupdate', function() {
    const duration = video.duration;
    const currentTime = video.currentTime;
    
    // 動画の進行具合に基づいて右側が暗くなるように変更
    const percentage = (currentTime / duration) * 100;
    
    // 右側が暗くなるようにオーバーレイの幅を設定
    dark_overlay.style.width = `${100 - percentage}%`;
});