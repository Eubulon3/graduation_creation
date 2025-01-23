const plt_img = document.getElementById("pltImg");
const dark_overlay = document.getElementById("darkOverlay");
const crosslines = document.getElementById("crosslines");
const video = document.getElementById("simVideo");
const video_sq = document.getElementById("simVideoSquare");
const video_source = document.getElementById("simVideo-source")
const video_sq_source = document.getElementById("simVideoSquare-source")
const img_container = document.getElementById("imgContainer");
const speed_buttons = document.querySelectorAll(".speed-controller div");
const fixed_button = document.getElementById("fixed-button");
const drl_button = document.getElementById("drl-button");

// 0:fixed, 1:drl
var state = 1;

fixed_button.addEventListener("click", (e) => {
    state = 0;
    changeVideo("../movs/fixed_edited.mp4", fixed_button);
})
drl_button.addEventListener("click", (e) => {
    state = 1;
    changeVideo('../movs/ehira_a_total_edited.mp4', drl_button);
})

img_container.addEventListener("click", (e) => {
    // 画像の位置とサイズを取得
    const rect = plt_img.getBoundingClientRect();   
    const imageWidth = rect.width;        // 画像の幅
    const imageHeight = rect.height;
    const clickX = e.clientX - rect.left; // クリックした位置のX座標
    const clickY = e.clientY - rect.top;
    
    const minX = imageWidth * 0.14;
    const maxX = imageWidth * 0.945;
    const minY = imageHeight * 0.08;
    const maxY = imageHeight * 0.7;
    
    const rangeLeft = rect.left + minX;
    const rangeRight = rect.left + maxX;
    const range = rangeRight - rangeLeft
    const clickX_range = e.clientX - rangeLeft; // クリックした位置のX座標
    
    if (clickX >= minX && clickX <= maxX && clickY >= minY && clickY <= maxY) {
        const videoDuration = video.duration; // 動画の長さ
        
        // クリック位置を動画の時間にマッピング
        const newTime = ((clickX_range) / range) * videoDuration;
        video.currentTime = newTime; // 動画の再生位置を設定
        video_sq.currentTime = newTime
    }

});

// 動画の進行に合わせてオーバーレイの幅を調整
video.addEventListener('timeupdate', function() {
    if(state == 1){
        const duration = video.duration;
        const currentTime = video.currentTime;
        
        // 動画の進行具合に基づいて左側が暗くなるように変更
        const percentage = (currentTime / duration) * 80.5;
        
        // 右側が暗くなるようにオーバーレイの幅を設定
        // dark_overlay.style.width = `${84.5 - percentage}%`;
        dark_overlay.style.width = `${4 + percentage}%`;
    }
});

speed_buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        speed_buttons.forEach(button => button.classList.remove('selected'));
        btn.classList.add("selected");

        const speed = btn.getAttribute("data-speed");

        video.playbackRate = parseFloat(speed);
        video_sq.playbackRate = parseFloat(speed);
    })
});

function togglePlayPause(){
    const playIcon = document.getElementById("play").querySelector("img");
    if(video.paused){
        video.play();
        video_sq.play();
        playIcon.src = "../imgs/img_pause.svg"
    }else{
        video.pause();
        video_sq.pause();
        playIcon.src = "../imgs/img_play.svg"
    }
}

function skipForward(){
    video.currentTime -= 10;
    video_sq.currentTime -= 10;
}

function skipLater(){
    video.currentTime += 10;
    video_sq.currentTime += 10;
}

function changeVideo(file_path, selectedButton){
    const playIcon = document.getElementById("play").querySelector("img");
    video_source.src = file_path
    video_sq_source.src = file_path
    video.load();
    video_sq.load();

    playIcon.src = "../imgs/img_play.svg"

    dark_overlay.style.width = `4%`;

    fixed_button.classList.remove("selected");
    drl_button.classList.remove("selected");
    if (plt_img.classList.contains("hide")){
        plt_img.classList.remove("hide");
        dark_overlay.classList.remove("hide");
        crosslines.classList.add("hide");
    } else{
        plt_img.classList.add("hide");
        dark_overlay.classList.add("hide");
        crosslines.classList.remove("hide");
    }

    
    // クリックされたボタンに.selectedクラスを追加
    selectedButton.classList.add("selected");
}
