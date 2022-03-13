const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "F8_PLAYER";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playList = $(".playlist");

/*
1. Render songs
2. Scroll top
3.Play / pause / seek
4. CD rotate
5. Next / prev
6. Random 
7. Next / Repeat when ended 
8. Active song
9. Scroll active song into view
10.Play song when click
*/

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Thay Lòng",
      singer: "Nal x TVK",
      path: "https://ve63.aadika.xyz/download/zeV_fQ1bMRA/mp3/320/1646020669/5db5f4417301d03d558a66aeef4cbb44643dc8ee353b6421e77abc854061d836/1?f=X2Convert.cc",
      image: "https://i.ytimg.com/vi/kWVdqd5S6I0/maxresdefault.jpg",
    },
    {
      name: "CÔ ĐƠN DÀNH CHO AI",
      singer: "LEE KEN x NAL",
      path: "https://ve60.aadika.xyz/download/tjGJjFE0fxE/mp3/320/1646021143/c2489c927d0877af8a115cf7a3e4a8cd2884483db0e31c4f3e5d24ade76e9d61/1?f=X2Convert.cc",
      image:
        "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/8/b/3/3/8b337aca4250fde26de3dfb1d6eca697.jpg",
    },
    {
      name: "HOA TÀN TÌNH TAN",
      singer: "Giang Jolee",
      path: "https://ve33.aadika.xyz/download/hJAdQ37XZKM/mp3/320/1646021229/bcb4f1ee6fed1368b56a7015dd4b24f58aa4692a2a38bbdbeb8219ed5030b8ad/1?f=X2Convert.cc",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "VUI LẮM NHA",
      singer: "HƯƠNG LY",
      path: "https://ve30.aadika.xyz/download/r2VF1iPy-Ho/mp3/320/1646021338/c1d3afe1d5c9528582c689c1d614675894f5d67f1720bb1ad314c223008d207f/1?f=X2Convert.cc",
      image:
        "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/6/1/0/0/61008e8966d6ac6afbe1edc933e50016.jpg",
    },
    {
      name: "Ít Nhưng Dài Lâu",
      singer: "Chu Thúy Huỳnh",
      path: "https://ve43.aadika.xyz/download/5A9AOhahZpU/mp3/320/1646021434/9101b8140f59511322378e160876ab2871b6984e7d82ffa73b3aaa903e77356f/1?f=X2Convert.cc",
      image: "https://i.ytimg.com/vi/gThP8mYhhMg/maxresdefault.jpg",
    },
    {
      name: "Hóa Tương Tư",
      singer: "Anh Rồng",
      path: "https://ve48.aadika.xyz/download/p2bW-2vnz3Q/mp3/320/1646021525/240379de48af0adda886160d85a5314241a30cc1fcef2ba54a6f59c888676e22/1?f=X2Convert.cc",
      image: "https://i.ytimg.com/vi/IPO-n-u2jOA/maxresdefault.jpg",
    },
    {
      name: "Anh Thương Em Em Thương Ai (Orinn Remix)",
      singer: "Đinh Tùng Huy",
      path: "https://ve36.aadika.xyz/download/J4ga-X7S8X4/mp3/320/1646021657/157865f4753c1011537110849b0864905faaf41372c11a4f9021b7f58e499ef8/1?f=X2Convert.cc",
      image: "https://i.ytimg.com/vi/-UYttnuKYNA/maxresdefault.jpg",
    },
    {
      name: "Tình Sầu Thiên Thu Muôn Lối Remix",
      singer: "Doãn Hiếu ft.LongDrae",
      path: "https://ve43.aadika.xyz/download/29JQT25fdYo/mp3/320/1646021817/e54e12746f62f866b6594a7279bee6554309515300c2aa5db5c195043c089103/1?f=X2Convert.cc",
      image: "https://i.ytimg.com/vi/29JQT25fdYo/0.jpg",
    },
  ],
  setConfig(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  render() {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? "active" : ""}"
        data-index="${index}">
              <div class="thumb"
                  style="background-image: url('${song.image}')">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
        `;
    });
    playList.innerHTML = htmls.join("");
  },
  defineProperties() {
    Object.defineProperty(this, "currentSong", {
      get() {
        return this.songs[this.currentIndex];
        // getCurrentSong: function () {
        //return this.songs[this.currentIndex];
        //}
      },
    });
  },
  handleEvents() {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // xử lý CD quay / dừng
    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000, // 10seconds
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();

    // xử lý phóng to / thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth >= 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    // khi song dc play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    // khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    // khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    // xử lý khi tua song
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    //khi next songs
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // khi prev songs
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };
    // xử lý random bật tắt
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Xử lý phát lại một song
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // xử lý next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // lắng nghe hành vi click vào playlist
    playList.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        // xử lý khi click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
        // xử lý khi click vào song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong() {
    setTimeout(function () {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  },
  loadCurrentSong() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig() {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start() {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();

    //định nghĩa các thuộc tính cho object
    this.defineProperties();

    //Lắng nghe / xử lý các sự kiện(DOM events)
    this.handleEvents();

    //tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // render playlist
    this.render();

    // hiển thị trạng thái ban đầu của button repeat và random
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
